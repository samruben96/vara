import * as Sentry from '@sentry/react-native';

import { initSentry, testCaptureException } from './sentry';

// Mock the Sentry module
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  wrap: jest.fn((component) => component),
}));

// Mock the Env module
jest.mock('@env', () => ({
  Env: {
    SENTRY_DSN: 'https://test-dsn@sentry.io/123',
  },
}));

describe('sentry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initSentry', () => {
    it('should initialize Sentry with correct DSN', () => {
      initSentry();

      expect(Sentry.init).toHaveBeenCalledTimes(1);
      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'https://test-dsn@sentry.io/123',
        })
      );
    });

    it('should configure environment based on __DEV__ flag', () => {
      initSentry();

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          environment: expect.any(String),
        })
      );
    });

    it('should configure tracesSampleRate', () => {
      initSentry();

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          tracesSampleRate: expect.any(Number),
        })
      );
    });

    it('should enable auto session tracking', () => {
      initSentry();

      expect(Sentry.init).toHaveBeenCalledWith(
        expect.objectContaining({
          enableAutoSessionTracking: true,
        })
      );
    });
  });

  describe('testCaptureException', () => {
    it('should capture exception using Sentry', () => {
      const testError = new Error('Test error');
      testCaptureException(testError);

      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(testError);
    });
  });
});
