/**
 * Supabase Client Configuration
 * @description Initializes Supabase client with MMKV storage adapter for secure token persistence
 */
import { Env } from '@env';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database.types';

import { storage } from './storage';

// Custom storage adapter for MMKV - required for React Native
const mmkvStorageAdapter = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};

export const supabase = createClient<Database>(
  Env.SUPABASE_URL,
  Env.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: mmkvStorageAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Required for React Native
    },
  }
);
