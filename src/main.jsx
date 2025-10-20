import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import barba from '@barba/core'

function BarbaProvider({ children }) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!barba) return
    try {
      barba.init({
        transitions: [{
          name: 'slide-scale-zoom',
          leave({ current, done }) {
            const el = current?.container
            if (!el) return done()
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const duration = prefersReduced ? 0 : 1000
            el.style.willChange = 'opacity, transform'
            el.style.transformOrigin = '50% 50%'
            el.style.transition = `transform ${duration}ms cubic-bezier(.22,1,.36,1), opacity ${duration}ms cubic-bezier(.22,1,.36,1)`
            el.style.opacity = '1'
            requestAnimationFrame(() => {
              el.style.opacity = '0'
              el.style.transform = 'translateX(40px) scale(.96)'
            })
            setTimeout(() => {
              el.style.removeProperty('transition')
              el.style.removeProperty('transform')
              el.style.removeProperty('opacity')
              el.style.removeProperty('will-change')
              done()
            }, duration)
          },
          enter({ next, done }) {
            const el = next?.container
            if (!el) return done()
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const duration = prefersReduced ? 0 : 1000
            el.style.willChange = 'opacity, transform'
            el.style.transformOrigin = '50% 50%'
            el.style.opacity = '0'
            el.style.transform = 'translateX(-40px) scale(1.04)'
            requestAnimationFrame(() => {
              el.style.transition = `transform ${duration}ms cubic-bezier(.22,1,.36,1), opacity ${duration}ms cubic-bezier(.22,1,.36,1)`
              el.style.opacity = '1'
              el.style.transform = 'translateX(0) scale(1)'
            })
            setTimeout(() => {
              el.style.removeProperty('transition')
              el.style.removeProperty('transform')
              el.style.removeProperty('opacity')
              el.style.removeProperty('will-change')
              done()
            }, duration)
          },
        }],
      })
    } catch (e) {
      console.warn('barba init failed', e)
    }
  }, [])
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BarbaProvider>
      <App />
    </BarbaProvider>
  </StrictMode>,
)
