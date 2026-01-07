/**
 * Scan API Types
 *
 * Types for the reverse image search API layer.
 */

import type { ScanImage, ScanResult } from '@/types/scan.types';

/**
 * Input for reverse image search mutation
 */
export interface ReverseImageSearchInput {
  image: ScanImage;
}

/**
 * Response from reverse image search Edge Function
 */
export interface ReverseImageSearchResponse {
  success: boolean;
  results: ScanResult[];
  totalFound: number;
  error?: string;
}

/**
 * Error from reverse image search
 */
export interface ReverseImageSearchError {
  message: string;
  code?: string;
}
