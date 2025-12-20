import { useCallback } from 'react';

import { captureEvent, getFeatureFlag, identifyUser } from '@/lib/posthog';

type EventProperties = Record<string, string | number | boolean | null>;

/**
 * Hook for PostHog analytics.
 *
 * Provides convenient methods for tracking events, identifying users,
 * and checking feature flags.
 */
export function usePostHog() {
  const track = useCallback((event: string, properties?: EventProperties) => {
    captureEvent(event, properties);
  }, []);

  const identify = useCallback(
    (userId: string, properties?: EventProperties) => {
      identifyUser(userId, properties);
    },
    []
  );

  const checkFeatureFlag = useCallback(
    async (key: string): Promise<string | boolean | undefined> => {
      return getFeatureFlag(key);
    },
    []
  );

  return {
    track,
    identify,
    checkFeatureFlag,
  };
}
