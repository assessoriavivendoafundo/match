# Fix Undo Snap Animation

## Issue
The "Undo" animation was reported as jerky when used multiple times in rapid succession. Specifically, the card returning to the stack would "snap" or glitch if the previous card was still settling or active.

## Analysis
The `Card` component used a conditional style prop to control position and rotation:
```typescript
style={{ 
    x: active ? x : 0, 
    rotate: active ? rotate : randomRotate,
    // ...
}}
```

When a card transitioned from `active` (being the top card) to `inactive` (being pushed down by a restored card), the `active` prop became `false`.
This caused React to immediately switch the `style.x` from the MotionValue `x` (which might be at 500px during an entry animation) to the literal value `0`.
This bypassing of the animation system caused an instant visual "snap" to the center.

## Solution
1.  **Removed Conditional Styles**: The `style` prop now binds the MotionValues (`x`, `opacity`) unconditionally, so the Framer Motion driver remains attached.
    ```typescript
    style={{ x, opacity, ... }}
    ```
2.  **Variant-Based Control**: Updated the `inactive` variant to explicitly animate `x` to `0` and `rotate` to `randomRotate`.
    ```typescript
    inactive: {
        x: 0, 
        rotate: randomRotate, 
        // ...
    }
    ```
3.  **Conditional Rotation**: For rotation, we release the MotionValue binding when inactive (`active ? rotate : undefined`) so the variant's `rotate: randomRotate` can take effect smoothly.

## Outcome
Cards now smoothly transition to their inactive "pile" position even if the user clicks Undo rapidly while animations are in flight. The snap is eliminated.
