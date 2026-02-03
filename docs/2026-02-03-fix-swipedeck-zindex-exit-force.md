# Fix SwipeDeck Z-Index Exit (Forced)

## Issue
Previous fixes to keep swiped cards on top of the deck were insufficient for rapid swiping or initial deck interaction ("first bunch of cards"). Swiped cards occasionally appeared to slide *behind* the next card.

## Analysis
While the `style` prop was updated to conditionally apply a high z-index (`!isPresent ? 200 : ...`), Framer Motion's animation lifecycle or React's commit timing seemed to cause a race condition where the Z-index update was either delayed or overridden by the new active card's promotion to `z=100`.

## Solution
1.  **Variant Enforcment**: Added `zIndex: 500` directly to the `exit` variant definition. Framer Motion applies variant properties with high priority during the animation phase, ensuring the exiting card's style is updated synchronously with the animation start.
2.  **Increased Gap**: Boosted the exiting z-index to `500` (vs active `100`) to provide a massive safety margin against any other stacking contexts or rogue z-indices.
3.  **Consistent Style Prop**: Updated the render-time `finalZIndex` calculation to match (`!isPresent ? 500 : ...`) to ensure the value is correct even before the variant fully kicks in (if there's a frame gap).

## Outcome
Exiting cards are now strictly forced to the top layer (`z=500`) by both the render logic and the animation driver, preventing any visual "clipping behind" during swipes.
