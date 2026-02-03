# Fix: SwipeDeck Undo Animation Consistency

**Date:** 2026-02-03
**Component:** `SwipeDeck.tsx`

## Issue
The "Undo" (go back) button animation was inconsistent. The user reported that the first undo worked correctly, but subsequent undo actions behaved differently (likely missing the "fly-back" animation).

## Analysis
The `Card` component used `initial={false}` on its root `motion.div`.
- `AnimatePresence` with `initial={false}` was used in the parent `SwipeDeck` to suppress initial mount animations for the deck.
- When a card was re-added via Undo, it was a new child in `AnimatePresence`.
- With `initial={false}` on the child, Framer Motion might have been inconsistent in applying the "enter" transition, or simply snapping to the `animate` state immediately without a defined `enter` variant to handle the specific "return from swipe" trajectory.

## Solution
1.  **Added `enter` Variant:** Defined an explicit `enter` variant in the `Card` component.
    - This variant reads the `exitDirectionsRef` to determine which way the card was swiped (left or right).
    - It sets the initial `x` position off-screen (e.g., +/- 500px) and rotation, matching the exit direction.
    - It defines a transition (`easeOut`) to smoothly animate the card back to the center.
2.  **Updated `initial` Prop:** Changed `motion.div` to use `initial="enter"`.
    - This ensures that *every time* a card is added to the DOM (during Undo), it executes the `enter` logic.
    - The parent `SwipeDeck`'s `AnimatePresence initial={false}` still correctly prevents this animation from running on the very first page load, preserving the desired startup behavior.

## Outcome
The Undo animation is now deterministic and consistent, always flying the card back from the direction it was swiped.
