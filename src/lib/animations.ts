import { useMemo } from 'react';

const BOT_PATTERNS = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|ia_archiver|facebot|twitterbot|linkedinbot|embedly|quora|pinterest|semrushbot|ahrefsbot/i;

function isBot(): boolean {
  if (typeof navigator === 'undefined') return true;
  return BOT_PATTERNS.test(navigator.userAgent);
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function useAnimationConfig() {
  const bot = useMemo(() => isBot(), []);
  return {
    initialState: bot ? 'visible' : 'hidden' as const,
  };
}

export function delayedVariants(delay: number) {
  return {
    ...fadeUpVariants,
    visible: { ...fadeUpVariants.visible, transition: { duration: 0.6, delay } },
  };
}
