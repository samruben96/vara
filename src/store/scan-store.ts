/**
 * Scan Store
 *
 * Zustand store for managing reverse image search scan state.
 * Tracks: captured image, scan status, progress, and results.
 *
 * Note: No persistence - scan state is session-only.
 */
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type {
  ScanCategory,
  ScanImage,
  ScanResult,
  ScanStatus,
} from '@/types/scan.types';

/**
 * Default scan categories for progress display
 */
const DEFAULT_CATEGORIES: ScanCategory[] = [
  { id: 'upload', label: 'Uploading image', status: 'pending' },
  { id: 'search', label: 'Searching web', status: 'pending' },
  { id: 'analyze', label: 'Analyzing results', status: 'pending' },
];

interface ScanState {
  // State
  status: ScanStatus;
  capturedImage: ScanImage | null;
  results: ScanResult[];
  progress: number;
  error: string | null;
  categories: ScanCategory[];

  // Actions
  setCapturedImage: (image: ScanImage | null) => void;
  setStatus: (status: ScanStatus) => void;
  setResults: (results: ScanResult[]) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  updateCategoryStatus: (id: string, status: ScanCategory['status']) => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as ScanStatus,
  capturedImage: null,
  results: [],
  progress: 0,
  error: null,
  categories: DEFAULT_CATEGORIES,
};

export const useScanStore = create<ScanState>()((set) => ({
  ...initialState,

  setCapturedImage: (image) =>
    set({
      capturedImage: image,
      status: image ? 'capturing' : 'idle',
    }),

  setStatus: (status) => set({ status }),

  setResults: (results) =>
    set({
      results,
      status: 'complete',
    }),

  setProgress: (progress) => set({ progress }),

  setError: (error) =>
    set({
      error,
      status: error ? 'error' : 'idle',
    }),

  updateCategoryStatus: (id, status) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id ? { ...cat, status } : cat
      ),
    })),

  reset: () =>
    set({
      ...initialState,
      categories: DEFAULT_CATEGORIES.map((cat) => ({
        ...cat,
        status: 'pending' as const,
      })),
    }),
}));

/**
 * Selector hooks for individual state values
 * Usage: const status = useScanStatus();
 */
export const useScanStatus = () => useScanStore((state) => state.status);
export const useScanProgress = () => useScanStore((state) => state.progress);
export const useScanResults = () => useScanStore((state) => state.results);
export const useScanError = () => useScanStore((state) => state.error);
export const useScanCategories = () =>
  useScanStore((state) => state.categories);
export const useCapturedImage = () =>
  useScanStore((state) => state.capturedImage);

/**
 * Action hooks - using useShallow to prevent infinite re-renders
 */
export const useScanActions = () =>
  useScanStore(
    useShallow((state) => ({
      setCapturedImage: state.setCapturedImage,
      setStatus: state.setStatus,
      setResults: state.setResults,
      setProgress: state.setProgress,
      setError: state.setError,
      updateCategoryStatus: state.updateCategoryStatus,
      reset: state.reset,
    }))
  );
