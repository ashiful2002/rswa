import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for minimal scroll-reveal animations
 * Returns ref to attach to element and isVisible state
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasBeenVisible = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          hasBeenVisible.current = true
          
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

/**
 * Wrapper component for easy scroll animations
 */
export function ScrollRevealSection({ children, className = '', delay = 0, ...props }) {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.15,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`transition-smooth ${isVisible ? 'fade-in' : 'opacity-0'} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
