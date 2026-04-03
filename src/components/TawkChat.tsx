import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkChat() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const s1 = document.createElement('script');
      s1.async = true;
      s1.src = 'https://embed.tawk.to/69cf967fd7942e1c3007d33d/1jl9e7ovh';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.head.appendChild(s1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
