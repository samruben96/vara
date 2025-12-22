// Mock the posthog-react-native module
const mockPostHogInstance = {
  capture: jest.fn(),
  identify: jest.fn(),
  getFeatureFlag: jest.fn(),
};

// Mock PostHog class
const MockPostHog = jest.fn(() => mockPostHogInstance);

jest.mock('posthog-react-native', () => ({
  __esModule: true,
  default: MockPostHog,
}));

// Mock the Env module
jest.mock('@env', () => ({
  Env: {
    POSTHOG_API_KEY: 'test-posthog-api-key',
    POSTHOG_HOST: 'https://app.posthog.com',
  },
}));

describe('posthog', () => {
  let posthogModule: typeof import('./posthog');

  beforeEach(() => {
    jest.clearAllMocks();
    MockPostHog.mockImplementation(() => mockPostHogInstance);
    // Reset the module to get fresh state
    jest.resetModules();
    posthogModule = require('./posthog');
  });

  describe('initPostHog', () => {
    it('should initialize PostHog with correct API key and host', async () => {
      await posthogModule.initPostHog();

      expect(MockPostHog).toHaveBeenCalledTimes(1);
      expect(MockPostHog).toHaveBeenCalledWith(
        'test-posthog-api-key',
        expect.objectContaining({
          host: 'https://app.posthog.com',
        })
      );
    });

    it('should enable app lifecycle event capture', async () => {
      await posthogModule.initPostHog();

      expect(MockPostHog).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          captureAppLifecycleEvents: true,
        })
      );
    });

    it('should preload feature flags', async () => {
      await posthogModule.initPostHog();

      expect(MockPostHog).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          preloadFeatureFlags: true,
        })
      );
    });

    it('should return cached instance on subsequent calls', async () => {
      const firstCall = await posthogModule.initPostHog();
      const secondCall = await posthogModule.initPostHog();

      expect(firstCall).toBe(secondCall);
      expect(MockPostHog).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPostHog', () => {
    it('should return null before initialization', () => {
      const result = posthogModule.getPostHog();
      expect(result).toBeNull();
    });

    it('should return instance after initialization', async () => {
      await posthogModule.initPostHog();
      const result = posthogModule.getPostHog();
      expect(result).toBe(mockPostHogInstance);
    });
  });

  describe('captureEvent', () => {
    it('should call capture on PostHog instance with event name', async () => {
      await posthogModule.initPostHog();
      posthogModule.captureEvent('test_event');

      expect(mockPostHogInstance.capture).toHaveBeenCalledWith(
        'test_event',
        undefined
      );
    });

    it('should call capture with properties when provided', async () => {
      await posthogModule.initPostHog();
      posthogModule.captureEvent('test_event', { key: 'value' });

      expect(mockPostHogInstance.capture).toHaveBeenCalledWith('test_event', {
        key: 'value',
      });
    });

    it('should not throw if PostHog not initialized', () => {
      expect(() => posthogModule.captureEvent('test_event')).not.toThrow();
    });
  });

  describe('identifyUser', () => {
    it('should call identify on PostHog instance with userId', async () => {
      await posthogModule.initPostHog();
      posthogModule.identifyUser('user-123');

      expect(mockPostHogInstance.identify).toHaveBeenCalledWith(
        'user-123',
        undefined
      );
    });

    it('should call identify with properties when provided', async () => {
      await posthogModule.initPostHog();
      posthogModule.identifyUser('user-123', { email: 'test@example.com' });

      expect(mockPostHogInstance.identify).toHaveBeenCalledWith('user-123', {
        email: 'test@example.com',
      });
    });

    it('should not throw if PostHog not initialized', () => {
      expect(() => posthogModule.identifyUser('user-123')).not.toThrow();
    });
  });

  describe('getFeatureFlag', () => {
    it('should return feature flag value', async () => {
      mockPostHogInstance.getFeatureFlag.mockReturnValue(true);
      await posthogModule.initPostHog();
      const result = await posthogModule.getFeatureFlag('test-flag');

      expect(result).toBe(true);
      expect(mockPostHogInstance.getFeatureFlag).toHaveBeenCalledWith(
        'test-flag'
      );
    });

    it('should return undefined if PostHog not initialized', async () => {
      const result = await posthogModule.getFeatureFlag('test-flag');
      expect(result).toBeUndefined();
    });
  });
});
