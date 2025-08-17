import { useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchStore } from "../context/useSearchStore";
import debounce from "lodash.debounce";

export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
  const { setItemsPerPage } = useSearchStore();
  const observerRef = useRef<ResizeObserver | null>(null);

  // Wrap calculateItemsPerPage in useCallback to maintain stable reference
  const calculateItemsPerPage = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    if (containerWidth === 0) return; // Skip if width is zero

    // const itemMinWidth = 192; // 12rem
    const itemMinWidth = 288; // 12rem
    // const gap = 16; // 1rem
    const gap = 24; // 1.5rem

    const itemsPerRow = Math.floor(
      (containerWidth + gap) / (itemMinWidth + gap),
    );

    const rows = 2;
    const calculatedItems = Math.max(itemsPerRow * rows, 1);

    setItemsPerPage(calculatedItems);
  }, [containerRef, setItemsPerPage]);

  // Memoize the debounced function to ensure it's stable across renders
  const debouncedCalculation = useMemo(
    () =>
      debounce((entries: ResizeObserverEntry[]) => {
        calculateItemsPerPage();
      }, 150), // Increased debounce duration for better performance
    [calculateItemsPerPage],
  );

  // Handle window resize events separately
  const handleWindowResize = useMemo(
    () =>
      debounce(() => {
        calculateItemsPerPage();
      }, 150),
    [calculateItemsPerPage],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial calculation
    calculateItemsPerPage();

    // Set up ResizeObserver for the container
    observerRef.current = new ResizeObserver(debouncedCalculation);
    observerRef.current.observe(containerRef.current);

    // Also listen for window resize events
    window.addEventListener("resize", handleWindowResize);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      debouncedCalculation.cancel(); // Cancel any pending debounced calls
      handleWindowResize.cancel(); // Cancel any pending window resize handlers
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [
    containerRef,
    debouncedCalculation,
    handleWindowResize,
    calculateItemsPerPage,
  ]);
};
