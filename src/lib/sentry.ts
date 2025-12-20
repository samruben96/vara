import { Env } from '@env';
import * as Sentry from '@sentry/react-native';

/**
 * Initialize Sentry error tracking.
 *
 * Call this once at app startup, typically in _layout.tsx.
 * Sentry captures unhandled exceptions, crashes, and performance data.
 */
export function initSentry(): void {
  Sentry.init({
    dsn: Env.SENTRY_DSN,

    // Performance Monitoring
    // 100% in dev for debugging, 20% in production for performance
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,

    // Enable Expo Router integration for navigation breadcrumbs
    enableAutoSessionTracking: true,

    // Environment tagging
    environment: __DEV__ ? 'development' : 'production',

    // Only capture in production - cleaner console in development
    enabled: !__DEV__,

    // Only enable logs in production
    enableLogs: !__DEV__,

    // Session Replay (if needed)
    _experiments: {
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    },
  });
}

/**
 * Capture an exception and send it to Sentry.
 *
 * @param error - The error to capture
 */
export function testCaptureException(error: Error): void {
  Sentry.captureException(error);
}

// Re-export Sentry for direct access when needed
export { Sentry };
