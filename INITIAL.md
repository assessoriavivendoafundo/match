# PROJECT: "UniMatch Italia" - Tinder for Universities



## 🎯 FEATURE OVERVIEW

Create a high-energy, interactive "Tinder-style" university discovery page for an existing website. The goal is to help Brazilian students find their ideal Italian university through a gamified experience.



## 🛠 TECH STACK & TOOLS

- **Frontend:** React/Next.js (Match the existing site's stack)

- **Animations:** Framer Motion (Use Motion MCP for complex gestures)

- **Data:** CSV Parsing (PapaParse or similar)

- **Styling:** Tailwind CSS (Fluid, mobile-first design)



## 📋 USER FLOW & LOGIC



### 1. The "Skim" Quiz (Initial Filter)

Before swiping, show a 3-question overlay to filter the CSV data:

- **Area of Study:** (e.g., Design, Engineering, Medicine)

- **Budget Level:** (e.g., Low, Medium, High)

- **Preferred City Size:** (e.g., Metrópole, Cidade Universitária, Litoral)



### 2. The Swipe Deck

- **Card Content:** Image of the university, Name, City, and a "Top Feature" badge (e.g., "Bolsa de Estudos", "Histórica").

- **Mechanics:** - Swipe Right: Add to `likedUniversities` state.

- Swipe Left: Move to next card.

- **Undo (Top Center):** Revert the last action (pop from history stack).

- **Animations:** - Use the reference `swipe1.html` for card physics (rotation + opacity).

- Implement "Spring" physics for a tactile feel.



### 3. Brazilian "Vibe" & Feedback

Every time a user likes a university, trigger a random floating exclamation in Portuguese.

- **List of Exclamations:** "Partiu Itália! 🇮🇹", "Que sonho!", "Imagina eu lá!", "Gostei!", "Top!", "Mamma Mia!"

- Refer to `animations.webp` for the visual style of these pop-ups.



### 4. The "Wishlist" (Bottom Drawer)

- A sticky bottom bar showing the count of liked universities.

- Clicking expands a list of saved names with a "Ver Detalhes" button.



## 📂 DATA REQUIREMENTS

- **Source:** `/data/universities.csv`

- **Columns expected:** `name`, `city`, `area`, `tuition_range`, `image_url`, `description_pt`.



## 🎨 VISUAL REFERENCES & ASSETS

- **Card UI:** Follow the aesthetic in `/examples/main-example.mp4`.

- **Motion:** Use Motion MCP to ensure 60fps performance.

- **Tone:** Alluring, aspirational, and high-energy.