# PRP - Fix Swipe Undo Animation

**Date:** 2026-02-03
**Author:** Gemini (UI Designer)
**Status:** Pending Confirmation

## Objective
Implement a "reverse swipe" animation when the user undoes a swipe action. The card should return to the deck from the direction it was swiped (e.g., if swiped right, it flies back in from the right), instead of appearing instantly or randomly.

## Technical Analysis
1.  **State Tracking**: The current `history` state in `SwipeDeck` only stores the `UniversityWithGradient` objects. It does not track whether the card was swiped 'like' (right) or 'nope' (left).
2.  **Undo Logic**: The `undoSwipe` function simply pops the last card from history and appends it to `deck`. The `Card` component mounts with `initial={false}`, causing no entry animation (or a default one).
3.  **Animation Control**: To animate the card *in*, we need to:
    *   Know the direction it was swiped.
    *   Set the `initial` state of the `Card` component to be off-screen in that direction.
    *   Animate to the "active" position (center).

## Action Plan
1.  **Update `UniversityWithGradient` Interface**: Add an optional `restoreAction?: 'like' | 'nope'` property to allow passing the restoration context to the card.
2.  **Update `history` State**: Change `history` to store objects containing `{ card: UniversityWithGradient, action: 'like' | 'nope' }` instead of just the card.
3.  **Update `removeCard`**: Save the `action` used when removing a card into the `history`.
4.  **Update `undoSwipe`**:
    *   Retrieve the `action` from the last history entry.
    *   Inject this `action` as `restoreAction` into the card object when adding it back to `deck`.
5.  **Update `Card` Component**:
    *   Add an `enter` variant to `variants`. This variant should position the card off-screen (e.g., `x: 500` for 'like', `x: -500` for 'nope') with matching rotation.
    *   Set the `initial` prop of `motion.div`:
        *   If `data.restoreAction` is present, use `"enter"`.
        *   Otherwise, keep `false` (or match existing behavior).
    *   Ensure the `enter` variant transitions smoothly to `active`.

## Expected Result
When the user clicks "Undo":
*   If the last card was swiped right ('like'), it will fly in from the right side and settle in the center.
*   If the last card was swiped left ('nope'), it will fly in from the left side and settle in the center.
*   The animation will feel like a natural reversal of the swipe action.

Proceed?
