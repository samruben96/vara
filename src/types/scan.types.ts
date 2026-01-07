/**
 * Scan Types
 *
 * Type definitions for the reverse image search feature.
 * Used across the scan flow: camera capture → API call → results display.
 */

/**
 * Captured image from camera
 */
export interface ScanImage {
  uri: string;
  width: number;
  height: number;
  base64?: string;
}

/**
 * Individual search result from SerpAPI
 */
export interface ScanResult {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
  sourceDomain: string;
  title: string;
  snippet?: string;
  foundAt: string;
}

/**
 * Scan session status
 */
export type ScanStatus =
  | 'idle'
  | 'capturing'
  | 'uploading'
  | 'searching'
  | 'complete'
  | 'error';

/**
 * Category for scan progress display
 * Re-exported from scan-status-list for convenience
 */
export interface ScanCategory {
  id: string;
  label: string;
  status: 'pending' | 'scanning' | 'complete';
}

/**
 * Full scan session (for persistence/history)
 */
export interface ScanSession {
  id: string;
  userId: string;
  status: ScanStatus;
  imageStoragePath?: string;
  results: ScanResult[];
  createdAt: string;
  completedAt?: string;
  error?: string;
}

/**
 * API response from reverse image search
 */
export interface ReverseImageSearchResponse {
  success: boolean;
  results: ScanResult[];
  totalFound: number;
  error?: string;
}
