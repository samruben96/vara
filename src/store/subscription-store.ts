import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '@/lib/storage';

// MMKV storage adapter for Zustand persistence
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export type SubscriptionTier = 'basic' | 'premium' | 'pro';

interface SubscriptionState {
  // State
  tier: SubscriptionTier;
  isActive: boolean;

  // Computed feature access
  canAccessDeepfake: boolean;
  canAccessDarkWeb: boolean;
  canAccessRealtime: boolean;

  // Actions
  setTier: (tier: SubscriptionTier) => void;
  setActive: (active: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      // Initial state - default to basic tier
      tier: 'basic',
      isActive: false,

      // Feature access computed from tier
      canAccessDeepfake: false,
      canAccessDarkWeb: false,
      canAccessRealtime: false,

      // Actions
      setTier: (tier) =>
        set({
          tier,
          canAccessDeepfake: tier === 'premium' || tier === 'pro',
          canAccessDarkWeb: tier === 'pro',
          canAccessRealtime: tier === 'pro',
        }),

      setActive: (active) => set({ isActive: active }),
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        tier: state.tier,
        isActive: state.isActive,
      }),
    }
  )
);
