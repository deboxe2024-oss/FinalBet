'use client';

import { useCallback } from 'react';

// Define a type for standard Facebook Pixel events for better type safety
type StandardEvent = 
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

// Extend the Window interface to include the fbq function
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const useFacebookPixel = () => {
  const track = useCallback((event: StandardEvent, data?: any) => {
    // Check if fbq is available on the window object before calling it
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, data);
    } else {
      console.warn(`Facebook Pixel (fbq) not found. Event "${event}" was not tracked.`);
    }
  }, []);

  return { track };
};
