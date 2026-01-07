/**
 * Scan Progress Screen
 *
 * Shows progress while reverse image search is running.
 * Automatically navigates to results when complete.
 */
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useReverseImageSearch } from '@/api/scan';
import { ScanProgress } from '@/components/features/scan';
import { FocusAwareStatusBar } from '@/components/ui';
import { lightColors } from '@/lib/design-system';
import {
  useCapturedImage,
  useScanActions,
  useScanCategories,
  useScanProgress,
} from '@/store/scan-store';

export default function ScanProgressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const hasStartedRef = useRef(false);
  const progressRef = useRef(10);

  const capturedImage = useCapturedImage();
  const categories = useScanCategories();
  const progress = useScanProgress();
  const { setProgress, setResults, setStatus, updateCategoryStatus, setError } =
    useScanActions();

  const { mutate: searchImages } = useReverseImageSearch();

  useEffect(() => {
    // Prevent running twice in development (StrictMode)
    if (hasStartedRef.current) return;

    // Redirect if no image
    if (!capturedImage) {
      router.replace('/(app)/scan');
      return;
    }

    hasStartedRef.current = true;

    // Start the scan process
    setStatus('uploading');
    updateCategoryStatus('upload', 'scanning');
    setProgress(10);

    // Simulate progress updates using a ref to track current value
    const progressInterval = setInterval(() => {
      if (progressRef.current >= 85) {
        clearInterval(progressInterval);
        return;
      }
      progressRef.current += 5;
      setProgress(progressRef.current);
    }, 500);

    // Call the API
    searchImages(
      { image: capturedImage },
      {
        onSuccess: (data) => {
          clearInterval(progressInterval);

          // Update all categories to complete
          updateCategoryStatus('upload', 'complete');
          setProgress(40);

          setTimeout(() => {
            updateCategoryStatus('search', 'complete');
            setProgress(70);
          }, 300);

          setTimeout(() => {
            updateCategoryStatus('analyze', 'complete');
            setProgress(100);
            setResults(data.results);
            setStatus('complete');

            // Navigate to results
            setTimeout(() => {
              router.replace('/(app)/scan/results');
            }, 500);
          }, 600);
        },
        onError: (error) => {
          clearInterval(progressInterval);
          setError(error.message);

          showMessage({
            message: 'Scan Failed',
            description: error.message,
            type: 'danger',
          });

          // Go back to start
          setTimeout(() => {
            router.replace('/(app)/scan');
          }, 1500);
        },
      }
    );

    return () => {
      clearInterval(progressInterval);
    };
  }, [capturedImage]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FocusAwareStatusBar />
      <ScanProgress
        progress={progress}
        categories={categories}
        title="Scanning the web..."
        testID="scan-progress"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background.primary,
  },
});
