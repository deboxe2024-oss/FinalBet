'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const FacebookPixelEvents = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is a client-side only check
    if (typeof window.fbq !== 'function') {
      return;
    }

    // Trigger a PageView event whenever the route changes
    window.fbq('track', 'PageView');
    
  }, [pathname, searchParams])

  return null
}
