import { useState, useEffect } from 'react'
import AOS from 'aos'

/**
 * Hook to prevent AOS from re-animating on state changes/re-renders
 * 
 * Usage:
 *   const aosProps = useAOS()
 *   <div {...aosProps({ 'data-aos': 'fade-up', 'data-aos-delay': '200' })}>
 * 
 * This ensures AOS attributes are only applied on initial mount,
 * preventing re-animation when component re-renders due to state changes.
 */
export function useAOS() {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    AOS.refresh()
    // Mark as animated after all animations complete
    // Longest delay in the app is typically 500ms + 300ms duration = 800ms
    // Adding buffer for safety
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Returns AOS attributes only if animations haven't completed yet
   * After animations complete, returns empty object to prevent re-animation
   */
  const getAOSProps = (attributes: Record<string, string>) => {
    return !hasAnimated ? attributes : {}
  }

  return getAOSProps
}

