# Optimization Report: SwipeDeck Performance (Mobile)
**Date:** 2026-02-03
**Component:** `src/components/unimatch/SwipeDeck.tsx`

## Problem
The `SwipeDeck` component was experiencing significant lag on mobile devices (specifically iPhone) during swipe interactions.

## Analysis
1.  **Expensive CSS Effects:** Large `blur-3xl` filters were applied to background blobs within each card. On high-DPI mobile screens, this causes massive GPU overdraw and framerate drops.
2.  **Render Loop Complexity:** The `enhanceDescription` logic (regex splitting and mapping) was running inside the `Card` render loop. This meant expensive string processing happened on every frame/re-render.
3.  **Lack of Memoization:** The `Card` component and its children were not memoized, and callbacks (`removeCard`, `registerCard`, etc.) were unstable, causing unnecessary re-renders of the entire stack during interactions.

## Optimizations Applied
1.  **CSS:** Replaced dynamic `blur-3xl` filters with static `radial-gradient` backgrounds. This achieves a similar visual effect ("glow") with near-zero GPU cost.
    *   *Before:* `bg-white/5 rounded-full blur-3xl`
    *   *After:* `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`
2.  **Logic:** Moved description parsing out of the render loop. Introduced `parseDescription` helper that runs *once* when data is loaded/filtered. The parsed segments are stored in the state.
3.  **React Performance:**
    *   Wrapped `Card` and `DisciplinesGrid` in `React.memo`.
    *   Wrapped critical callbacks (`updateGlobalX`, `removeCard`, `registerCard`) in `useCallback`.
    *   Used `useRef` for tracking the current deck state to avoid stale closures without forcing re-renders.

## Result
Swipe interactions should now be significantly smoother (aiming for 60fps) on mobile devices due to reduced main-thread blocking and lighter GPU workload.
