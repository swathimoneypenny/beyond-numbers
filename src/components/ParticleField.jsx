import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* Raw three.js particle field — the heavy part, loaded lazily by
   ParticleBackground so three.js is code-split out of the initial bundle.

   Small drifting particles in the three brand colours (purple, teal, yellow)
   with additive blending so they glow on the dark sections. A subtle parallax
   eases the field toward the pointer. Renderer/geometry/material are disposed
   on unmount, and the wrapper unmounts this when the section scrolls out of
   view, so at most one or two WebGL contexts are ever alive. */

const BRAND = [0x8a1fb0, 0x25a88c, 0xf5c400] // purple, teal, yellow

/* Soft round sprite so particles read as glowing dots, not squares. */
function makeSprite() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

export default function ParticleField({ count = 2200 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let width = el.clientWidth || 1
    let height = el.clientHeight || 1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 60

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // WebGL unavailable — leave the section's own gradient background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const SX = 140
    const SY = 90
    const SZ = 60
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const palette = BRAND.map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SX
      positions[i * 3 + 1] = (Math.random() - 0.5) * SY
      positions[i * 3 + 2] = (Math.random() - 0.5) * SZ
      const col = palette[i % palette.length]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
      speeds[i] = 0.25 + Math.random() * 0.75
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const sprite = makeSprite()
    const mat = new THREE.PointsMaterial({
      size: 1.5,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Pointer parallax (eased). Listens on window so it works over the content.
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const onResize = () => {
      width = el.clientWidth || 1
      height = el.clientHeight || 1
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    const pos = geo.attributes.position.array
    let raf
    const tick = () => {
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += 0.03 * speeds[i] // gentle upward drift
        if (pos[i * 3 + 1] > SY / 2) pos[i * 3 + 1] = -SY / 2
      }
      geo.attributes.position.needsUpdate = true

      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04
      points.rotation.y = current.x * 0.25
      points.rotation.x = current.y * 0.18

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [count])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}
