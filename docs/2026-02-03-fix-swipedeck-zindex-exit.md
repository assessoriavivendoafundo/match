# Fix SwipeDeck Z-Index Exit

## Issue
Despite a previous fix, swiped cards were still occasionally observed going "behind" the new top card during exit animations. 

## Root Cause Analysis
The previous logic was:
```typescript
const finalZIndex = (!isPresent && active) ? 200 : (active ? 100 : index);
```
This relied on the `active` prop remaining `true` for the exiting component managed by `AnimatePresence`. While theoretically correct (AnimatePresence retains old props), subtle timing issues or state updates in the parent component (slice logic) might cause the `active` prop to evaluate to `false` in the context where `finalZIndex` is calculated, causing the exiting card to drop to `index` (low z-index) vs the new active card's `100`.

## Solution
Simplified the Z-Index logic to prioritize *any* exiting card:
```typescript
const finalZIndex = !isPresent ? 200 : (active ? 100 : index);
```
Since we only remove the top card during a swipe, any card that is `!isPresent` (exiting) should visually be the "swiped" card and thus must be on top of the stack. This removes the dependency on the `active` prop for the exiting state.

## Outcome
Exiting cards now reliably stay on top of the stack during their exit animation, as `!isPresent` is derived directly from the Framer Motion hook `useIsPresent`, which is the source of truth for the exit phase.
