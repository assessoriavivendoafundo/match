# Fix Undo Animation - Deterministic & Smooth

## Objective
Improve the "undo" (go-to-previous-card) animation in the `SwipeDeck` component to be simple, slow, smooth, and deterministic. The card should return exactly from the direction it was swiped (reversed path), appear on top of the stack, and not show "Match"/"Nope" labels during the return animation.

## Technical Analysis
- **Current State**: The undo logic simply appended the card back to the `deck` array. `AnimatePresence` handled the entry, but since `initial={false}` was set on `AnimatePresence` and no explicit `initial` prop was on the `Card` for this state, it likely just popped in or used a default scale transition.
- **Requirement**:
    - **Deterministic**: Track whether the card was 'liked' or 'noped' and animate from that specific side (e.g., if liked (right), return from right).
    - **Stacking**: The returned card must be on top. (Handled naturally by array order).
    - **Labels**: Hidden during animation.
    - **Timing**: Slow and smooth.

## Implementation Details
1.  **State Updates (`SwipeDeck.tsx`)**:
    - Updated `history` to store `{ data: UniversityWithGradient, action: 'like' | 'nope' }`.
    - Added `restoredCardId` state to track the specific card being restored and its original action.
    - Updated `removeCard` to save the action.
    - Updated `undoSwipe` to retrieve the action and set `restoredCardId`.

2.  **Card Component Updates**:
    - Added `restoreAction` and `onRestoreComplete` props.
    - Calculated `initial` variant dynamically:
        - If `restoreAction` is set, `initial` is `{ x: 1000/-1000, rotate: 45/-45, opacity: 1 }`.
    - Updated `active` variant to use a slower transition (`duration: 0.6`, `ease: "easeInOut"`) *only* when restoring.
    - Conditionally hide "Match"/"Nope" labels when `isRestoring` is true.
    - Added `onAnimationComplete` handler to reset the `restoredCardId` state (via `onRestoreComplete` callback) once the card settles, enabling normal interaction and label behavior for subsequent swipes.

## Outcome
The undo animation now feels much more natural and physical, as the card "returns" to the deck from where it was thrown, without distracting UI elements.
