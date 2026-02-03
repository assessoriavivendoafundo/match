# Fix SwipeDeck Z-Index Stacking

**Date:** 2026-02-03
**Author:** Gemini
**Status:** Implemented

## Problem
Users reported that swiped cards appeared to go "behind" the next card in the stack during the exit animation. This was caused by the new active card (the one behind the swiped card) being promoted to `active=true` and `zIndex=100` immediately upon the swiped card's removal from the state. Since the swiped card (now exiting via AnimatePresence) also had `zIndex=100`, the stacking order was determined by DOM order, often causing the swiped card to pop behind.

## Solution
Updated the `finalZIndex` logic in `SwipeDeck.tsx` to strictly prioritize exiting active cards.

```typescript
// Before
const finalZIndex = active || (!isPresent && active) ? 100 : index;

// After
const finalZIndex = (!isPresent && active) ? 200 : (active ? 100 : index);
```

This ensures that:
1.  **Exiting Active Card**: Gets `zIndex: 200`.
2.  **New Active Card**: Gets `zIndex: 100`.
3.  **Background Cards**: Get `zIndex: index` (low).

The exiting card now always stays visually on top of the stack until the animation completes.

## Verification
- Code linted.
- Logic trace confirms exiting active card (200) > new active card (100).
