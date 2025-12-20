import { Env } from '@env';
import PostHog from 'posthog-react-native';

type EventProperties = Record<string, string | number | boolean | null>;

let posthogInstance: PostHog | null = null;

/**
 * Initialize PostHog analytics.
 *
 * Call this once at app startup, typically in _layout.tsx.
 * PostHog captures screen views, user events, and manages feature flags.
 *
 * @returns The PostHog instance or null if not available
 */
export async function initPostHog(): Promise<PostHog | null> {
  if (posthogInstance) return posthogInstance;

  try {
    // PostHog React Native uses constructor, not initAsync
    posthogInstance = new PostHog(Env.POSTHOG_API_KEY ?? '', {
      host: Env.POSTHOG_HOST || 'https://app.posthog.com',

      // Capture app lifecycle events automatically
      captureAppLifecycleEvents: true,

      // Enable feature flag preloading
      preloadFeatureFlags: true,

      // Disable in development to reduce noise
      disabled: __DEV__,
    });

    return posthogInstance;
  } catch {
    // PostHog may fail to initialize if API key is missing
    return null;
  }
}

/**
 * Get the current PostHog instance.
 *
 * @returns The PostHog instance or null if not initialized
 */
export function getPostHog(): PostHog | null {
  return posthogInstance;
}

/**
 * Get a feature flag value.
 *
 * @param key - The feature flag key
 * @returns The flag value, or undefined if not available
 */
export async function getFeatureFlag(
  key: string
): Promise<string | boolean | undefined> {
  const posthog = getPostHog();
  if (!posthog) return undefined;
  return posthog.getFeatureFlag(key);
}

/**
 * Capture an analytics event.
 *
 * @param event - The event name
 * @param properties - Optional event properties
 */
export function captureEvent(
  event: string,
  properties?: EventProperties
): void {
  const posthog = getPostHog();
  posthog?.capture(event, properties);
}

/**
 * Identify a user for analytics.
 *
 * @param userId - The user's unique identifier
 * @param properties - Optional user properties
 */
export function identifyUser(
  userId: string,
  properties?: EventProperties
): void {
  const posthog = getPostHog();
  posthog?.identify(userId, properties);
}

// Re-export PostHog for direct access when needed
export { PostHog };
