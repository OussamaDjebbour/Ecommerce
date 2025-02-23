// import { useEffect, useRef } from "react";
// import { useSearchStore } from "../context/useSearchStore";

// export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
//   const { setItemsPerPage } = useSearchStore();
//   const observerRef = useRef<ResizeObserver | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const calculateVisibleItems = (entries: ResizeObserverEntry[]) => {
//       const entry = entries[0];
//       console.log("entriesentriesentriesentries", entries, entry);
//       if (!entry) return;

//       // Get the container width
//       const containerWidth = entry.contentRect.width;
//       // Minimum width of each item (12rem = 192px) plus gap (1rem = 16px)
//       const itemMinWidth = 192;
//       const gap = 16;

//       // Calculate how many items can fit in one row
//       const itemsPerRow = Math.floor(
//         (containerWidth + gap) / (itemMinWidth + gap),
//       );

//       // Update the items per page to show complete rows (2 rows by default)
//       const rows = 2;
//       const calculatedItems = Math.max(itemsPerRow * rows, 1);
//       console.log("containerRef.current", containerRef.current);

//       setItemsPerPage(calculatedItems);
//     };

//     observerRef.current = new ResizeObserver(calculateVisibleItems);
//     observerRef.current.observe(containerRef.current);

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [containerRef, setItemsPerPage]);
// };

// import { useEffect, useRef, useCallback } from "react";
// import { useSearchStore } from "../context/useSearchStore";
// import debounce from "lodash.debounce";

// export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
//   const { setItemsPerPage } = useSearchStore();
//   const observerRef = useRef<ResizeObserver | null>(null);

//   // Debounce the calculation to avoid excessive updates
//   const debouncedCalculation = useCallback(
//     debounce((entries: ResizeObserverEntry[]) => {
//       const entry = entries[0];
//       if (!entry) return;

//       const containerWidth = entry.contentRect.width;
//       const itemMinWidth = 192; // 12rem
//       const gap = 16; // 1rem

//       const itemsPerRow = Math.floor(
//         (containerWidth + gap) / (itemMinWidth + gap),
//       );
//       const rows = 2;
//       const calculatedItems = Math.max(itemsPerRow * rows, 1);

//       setItemsPerPage(calculatedItems);
//     }, 150), // 150ms debounce
//     [setItemsPerPage],
//   );

//   useEffect(() => {
//     if (!containerRef.current) return;

//     observerRef.current = new ResizeObserver(debouncedCalculation);
//     observerRef.current.observe(containerRef.current);

//     return () => {
//       debouncedCalculation.cancel();
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [debouncedCalculation, containerRef]);
// };

// import { useEffect, useRef, useCallback } from "react";
// import { useSearchStore } from "../context/useSearchStore";
// import debounce from "lodash.debounce";

// export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
//   const { setItemsPerPage } = useSearchStore();
//   const observerRef = useRef<ResizeObserver | null>(null);

//   // Define the function inline
//   const calculateItems = useCallback(
//     (entries: ResizeObserverEntry[]) => {
//       const entry = entries[0];
//       if (!entry) return;

//       const containerWidth = entry.contentRect.width;
//       const itemMinWidth = 192; // 12rem
//       const gap = 16; // 1rem

//       const itemsPerRow = Math.floor(
//         (containerWidth + gap) / (itemMinWidth + gap),
//       );
//       const rows = 2;
//       const calculatedItems = Math.max(itemsPerRow * rows, 1);

//       setItemsPerPage(calculatedItems);
//     },
//     [setItemsPerPage],
//   );

//   // Debounce the function
//   const debouncedCalculation = debounce(calculateItems, 150);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     observerRef.current = new ResizeObserver(debouncedCalculation);
//     observerRef.current.observe(containerRef.current);

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [containerRef, debouncedCalculation]);
// };

// import { useEffect, useRef, useCallback } from "react";
// import { useSearchStore } from "../context/useSearchStore";
// import debounce from "lodash.debounce";

// export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
//   const { setItemsPerPage } = useSearchStore();
//   const observerRef = useRef<ResizeObserver | null>(null);

//   // Debounce the calculation to avoid excessive updates
//   const debouncedCalculation = useCallback(
//     debounce((entries: ResizeObserverEntry[]) => {
//       const entry = entries[0];
//       if (!entry) return;

//       const containerWidth = entry.contentRect.width;
//       const itemMinWidth = 192; // 12rem
//       const gap = 16; // 1rem

//       const itemsPerRow = Math.floor(
//         (containerWidth + gap) / (itemMinWidth + gap),
//       );
//       const rows = 2;
//       const calculatedItems = Math.max(itemsPerRow * rows, 1);

//       setItemsPerPage(calculatedItems);
//     }, 150), // 150ms debounce
//     [setItemsPerPage],
//   );

//   useEffect(() => {
//     if (!containerRef.current) return;

//     observerRef.current = new ResizeObserver(debouncedCalculation);
//     observerRef.current.observe(containerRef.current);

//     return () => {
//       debouncedCalculation.cancel();
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [containerRef, debouncedCalculation]);
// };

import { useEffect, useRef, useMemo } from "react";
import { useSearchStore } from "../context/useSearchStore";
import debounce from "lodash.debounce";

export const useGridItems = (containerRef: React.RefObject<HTMLDivElement>) => {
  const { setItemsPerPage } = useSearchStore();
  const observerRef = useRef<ResizeObserver | null>(null);

  // Memoize the debounced function so it's stable across renders
  const debouncedCalculation = useMemo(
    () =>
      debounce((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        if (!entry) return;

        const containerWidth = entry.contentRect.width;
        const itemMinWidth = 192; // 12rem
        const gap = 16; // 1rem

        const itemsPerRow = Math.floor(
          (containerWidth + gap) / (itemMinWidth + gap),
        );
        const rows = 2;
        const calculatedItems = Math.max(itemsPerRow * rows, 1);

        setItemsPerPage(calculatedItems);
      }, 150), // 150ms debounce
    [setItemsPerPage],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new ResizeObserver(debouncedCalculation);
    observerRef.current.observe(containerRef.current);
    console.log("containerRef.current", containerRef.current);
    return () => {
      debouncedCalculation.cancel();
      observerRef.current?.disconnect();
    };
  }, [containerRef, debouncedCalculation]);

  return null;
};
