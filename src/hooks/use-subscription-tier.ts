import { useSubscriptionStore } from '@/store';

/**
 * Hook to access subscription tier and feature access flags.
 *
 * Usage:
 * ```tsx
 * const { tier, canAccessDeepfake, canAccessDarkWeb } = useSubscriptionTier();
 *
 * if (!canAccessDeepfake) {
 *   return <UpgradePrompt feature="deepfake" />;
 * }
 * ```
 */
export function useSubscriptionTier() {
  const tier = useSubscriptionStore((state) => state.tier);
  const isActive = useSubscriptionStore((state) => state.isActive);
  const canAccessDeepfake = useSubscriptionStore(
    (state) => state.canAccessDeepfake
  );
  const canAccessDarkWeb = useSubscriptionStore(
    (state) => state.canAccessDarkWeb
  );
  const canAccessRealtime = useSubscriptionStore(
    (state) => state.canAccessRealtime
  );

  return {
    tier,
    isActive,
    canAccessDeepfake,
    canAccessDarkWeb,
    canAccessRealtime,
  };
}
