/* Auth API client for the FastAPI backend.

   Endpoints (base URL from VITE_API_URL):
     POST /api/auth/signup  {email, password}
     POST /api/auth/login   {email, password}
     GET  /api/auth/me      Authorization: Bearer <token>

   The backend returns errors as {"detail": "<message>"} and uses
   401 for bad credentials / missing token, 400 for validation,
   409 for a duplicate email on signup.

   TOKEN STORAGE: in-memory module variable mirrored to sessionStorage.
   localStorage is deliberately NOT used - sessionStorage is scoped to the tab
   and cleared when it closes, which limits the blast radius of an XSS token
   theft and stops the session leaking into other tabs/windows. */

const BASE = String(import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

const TOKEN_KEY = 'bn.auth.token'

/* ---- token store ------------------------------------------------------- */

let accessToken = null // memory is the source of truth

export function getToken() {
  if (accessToken) return accessToken
  try {
    accessToken = sessionStorage.getItem(TOKEN_KEY)
  } catch {
    accessToken = null // Safari private mode / storage disabled
  }
  return accessToken
}

export function setToken(token) {
  accessToken = token || null
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable - the in-memory token still works for this page life.
  }
}

export function clearToken() {
  setToken(null)
}

/* ---- errors ------------------------------------------------------------ */

export class AuthError extends Error {
  constructor(message, status = 0, payload = null) {
    super(message)
    this.name = 'AuthError'
    this.status = status
    this.payload = payload
  }
}

/* FastAPI puts a string in `detail` for HTTPException, or an array of
   {loc, msg, type} objects for request-validation failures. */
function detailToMessage(detail) {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    const parts = detail
      .map((d) => {
        if (typeof d === 'string') return d
        const field = Array.isArray(d?.loc) ? d.loc[d.loc.length - 1] : null
        return field ? `${field}: ${d?.msg ?? 'invalid'}` : (d?.msg ?? null)
      })
      .filter(Boolean)
    if (parts.length) return parts.join(' ')
  }
  return null
}

const FALLBACK = {
  400: 'Please check the details you entered and try again.',
  401: 'Incorrect email or password.',
  403: 'You do not have access to that.',
  404: 'That endpoint was not found on the server.',
  409: 'An account with that email already exists.',
  422: 'Please check the details you entered and try again.',
  429: 'Too many attempts. Please wait a moment and try again.',
}

function errorFor(status, payload) {
  const fromServer = detailToMessage(payload?.detail)
  const message =
    fromServer ||
    FALLBACK[status] ||
    (status >= 500
      ? 'The server had a problem. Please try again in a moment.'
      : 'Something went wrong. Please try again.')
  return new AuthError(message, status, payload)
}

/* ---- request ----------------------------------------------------------- */

async function readBody(res) {
  const text = await res.text().catch(() => '')
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { detail: text }
  }
}

async function request(path, { method = 'GET', body, auth = false, signal } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    })
  } catch (err) {
    if (err?.name === 'AbortError') throw err
    throw new AuthError(
      'Could not reach the server. Check your connection and try again.',
      0,
    )
  }

  const payload = await readBody(res)
  if (!res.ok) throw errorFor(res.status, payload)
  return payload
}

/* ---- shape helpers ----------------------------------------------------- */

/* Accepts the common token field names so a backend tweak doesn't break login. */
function pickToken(payload) {
  return (
    payload?.access_token ??
    payload?.accessToken ??
    payload?.token ??
    payload?.data?.access_token ??
    null
  )
}

/* /me may return the user directly or wrapped as {user: {...}}. */
export function normalizeUser(payload) {
  if (!payload) return null
  const u = payload.user ?? payload
  if (!u || typeof u !== 'object') return null
  return {
    id: u.id ?? u.user_id ?? null,
    email: u.email ?? u.username ?? null,
    ...u,
  }
}

/* ---- endpoints --------------------------------------------------------- */

export async function login(email, password) {
  const payload = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  const token = pickToken(payload)
  if (token) setToken(token)
  return { token, payload }
}

export async function signup(email, password) {
  const payload = await request('/api/auth/signup', {
    method: 'POST',
    body: { email, password },
  })
  const token = pickToken(payload) // signup may or may not auto-issue a token
  if (token) setToken(token)
  return { token, payload }
}

export async function me({ signal } = {}) {
  return request('/api/auth/me', { auth: true, signal })
}

export function logout() {
  clearToken()
}

export const API_BASE = BASE
