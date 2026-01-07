/**
 * Reverse Image Search Mutation Hook
 *
 * React Query mutation for performing reverse image search via SerpAPI.
 *
 * Flow:
 * 1. Upload captured image to Supabase Storage
 * 2. Call Edge Function with image path
 * 3. Edge Function calls SerpAPI and returns results
 * 4. Clean up temporary image
 */
import { useMutation } from '@tanstack/react-query';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

import { supabase } from '@/lib/supabase';

import type {
  ReverseImageSearchError,
  ReverseImageSearchInput,
  ReverseImageSearchResponse,
} from './types';

/**
 * useReverseImageSearch - React Query mutation hook for reverse image search
 *
 * @example
 * ```tsx
 * const { mutate, isPending, error } = useReverseImageSearch();
 *
 * const handleScan = (image: ScanImage) => {
 *   mutate({ image }, {
 *     onSuccess: (data) => {
 *       console.log(`Found ${data.totalFound} results`);
 *     },
 *   });
 * };
 * ```
 */
export function useReverseImageSearch() {
  return useMutation<
    ReverseImageSearchResponse,
    ReverseImageSearchError,
    ReverseImageSearchInput
  >({
    mutationFn: async ({ image }: ReverseImageSearchInput) => {
      // 1. Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw {
          message: 'You must be logged in to perform a scan',
          code: 'AUTH_REQUIRED',
        };
      }

      // 2. Read image as base64
      let base64: string;
      try {
        base64 = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } catch {
        throw { message: 'Failed to read image file', code: 'FILE_READ_ERROR' };
      }

      // 3. Generate unique file path
      const timestamp = Date.now();
      const fileName = `${user.id}/scan-${timestamp}.jpg`;

      // 4. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(fileName, decode(base64), {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        throw {
          message: `Image upload failed: ${uploadError.message}`,
          code: 'UPLOAD_ERROR',
        };
      }

      try {
        // 5. Get session token for Edge Function auth
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw {
            message: 'Session expired. Please log in again.',
            code: 'SESSION_EXPIRED',
          };
        }

        // 6. Call Edge Function
        const { data, error: fnError } =
          await supabase.functions.invoke<ReverseImageSearchResponse>(
            'reverse-image-search',
            {
              body: { imagePath: fileName },
            }
          );

        if (fnError) {
          throw {
            message: fnError.message || 'Search failed',
            code: 'FUNCTION_ERROR',
          };
        }

        if (!data) {
          throw {
            message: 'No response from search service',
            code: 'EMPTY_RESPONSE',
          };
        }

        if (!data.success && data.error) {
          throw { message: data.error, code: 'SEARCH_ERROR' };
        }

        return data;
      } finally {
        // 7. Clean up - delete temporary image
        await supabase.storage.from('user-photos').remove([fileName]);
      }
    },
  });
}
