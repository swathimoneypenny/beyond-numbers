/* Contact form helper. Until the email backend is ready, the contact forms
   open a pre-filled mail draft to CONTACT_EMAIL instead of pretending to submit
   — so the visitor's message actually reaches someone (from their own mail
   client). Shared by the contact page and the popup. */

export const CONTACT_EMAIL = 'contact@beyond-numbers.com'

/* Build a mailto: link carrying the form fields into the subject and body. */
export function buildContactMailto({ name = '', email = '', firm = '', message = '' } = {}) {
  const subject = name ? `Website enquiry from ${name}` : 'Website enquiry'
  const body = [
    name ? `Name: ${name}` : null,
    email ? `Email: ${email}` : null,
    firm ? `Firm: ${firm}` : null,
    '',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
