# PRP - Refine Undo Animation and Card Z-Index

**Date:** 2026-02-03
**Author:** Gemini (UI Designer)
**Status:** Pending Confirmation

## Objective
Refine the SwipeDeck experience by:
1.  Hiding "MATCH/NOPE" labels during the undo animation.
2.  Ensuring the active/exiting card always stays on top of the stack (preventing it from going "behind" other cards during swipe/exit).

## Technical Analysis
1.  **Label Visibility**: Labels depend on the `x` motion value. During Undo, `x` starts at 500/-500, making labels fully visible. I will introduce an `isRestoring` flag that suppresses labels until the card reaches the center.
2.  **Stacking Order (Z-Index)**: The current `zIndex` is based on the array `index`. When a card is swiped, it should maintain a high `zIndex` to stay visible above the "next" card that is scaling up.

## Action Plan
1.  **Modify `Card` Component**:
    *   Add `isRestoring` state (boolean), initialized to `true` if `data.restoreAction` exists.
    *   Update the `undo` animation `onComplete` to set `isRestoring(false)`.
    *   Add an `onDragStart` handler to set `isRestoring(false)` immediately if the user interacts with the card while it's still animating back.
    *   Wrap label rendering with `!isRestoring` check.
2.  **Update Z-Index Logic**:
    *   Change the `zIndex` in `style` to `active ? 100 : index` to ensure the top card is always prioritized.
    *   Add `zIndex: 100` to the `exit` variant.

## Expected Result
*   Undo animation will be cleaner, showing only the card flying back without the distracting "MATCH/NOPE" labels.
*   Swiped cards will stay in front of the stack until they fully disappear, providing a more physically consistent UI.

Proceed?
