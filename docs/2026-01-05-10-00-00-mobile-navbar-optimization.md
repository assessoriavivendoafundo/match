# Mobile Navbar & Vertical Optimization

## Objective
Fix the Navbar visibility on mobile devices and optimize the site layout for vertical (mobile portrait) usage without altering the desktop experience.

## Technical Analysis
1.  **Navbar Visibility:**
    *   Currently, the `Navbar` component hides the brand name text ("ACADEMITALY") on mobile (`hidden lg:block`). The user specifically mentioned "writes aren't there", implying the text is missing.
    *   The mobile menu functionality exists but the user says "function doesn't seem to exist". This might be due to the text visibility or potentially z-index issues, though `z-50` is set.
    *   Proposed Fix: Show the brand text on mobile, adjust size. Ensure the hamburger menu works and contrasts well.

2.  **Vertical Optimization:**
    *   Current sections use large vertical padding (`py-20`, `py-16`) which might be excessive for mobile screens, pushing content too far down.
    *   Proposed Fix: Use responsive padding (e.g., `py-10 md:py-20`).
    *   Ensure font sizes for headings are not too large on mobile (`text-3xl` vs `text-4xl`).

## Action Plan
1.  **Modify `src/components/Navbar.tsx`:**
    *   Remove `hidden` from the "ACADEMITALY" span, or make it `block` with a smaller font size on mobile.
    *   Ensure the mobile menu overlay interacts correctly (it's currently `absolute` below the header).
2.  **Modify Layout & Components:**
    *   Update `src/app/page.tsx` sections to use responsive padding.
    *   Update `Hero.tsx`, `Services.tsx`, `Benefits.tsx` to ensure `flex-col` stacking and appropriate spacing on mobile.
