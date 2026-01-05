### 🔄 Project Awareness & Context
- **Always read `INITIAL.md`** at the start of a new conversation to understand the project's architecture, Brazilian "vibe" goals, and CSV data constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use context7 MCP** to fetch the most up-to-date documentation for `Framer Motion`, `Next.js 14+`, and `Tailwind CSS`.
- **Refer to the `/references` folder** for library documentation, technical guides, and animation reference snippets.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `INITIAL.md`.

### 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
  For this React/Next.js stack, this looks like:
    - `components/deck/` - Swipe mechanics and card UI
    - `hooks/` - Custom gesture and state logic (`useSwipe`, `useUndo`)
    - `utils/` - Data parsing and formatting (PapaParse logic)
- **Use clear, consistent imports** (prefer absolute `@/` imports).
- **Use local .env** for environment variables and load them via Next.js standard patterns.

### 🧪 Testing & Reliability
- **Always create Vitest/Jest unit tests for new features** (functions, state transitions, filtering logic).
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it.
- **Tests should live in a `/tests` folder** mirroring the main app structure.
  - Include at least:
    - 1 test for expected swipe-right/wishlist flow
    - 1 test for the "Undo" edge case (empty stack)
    - 1 failure case for malformed CSV data

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

### 📎 Style & Conventions
- **Use TypeScript** as the primary language.
- **Follow React/Next.js best practices**, use type hints, and ensure 60fps performance for animations.
- **Use `zod` for data validation** (especially for CSV column mapping).
- Use **Spring Physics** for all swipe animations using Framer Motion logic: $$F = -k \cdot x$$.
- Write **docstrings for every function** using the Google style:
  ```typescript
  /**
   * Brief summary of the component/hook.
   *
   * Args:
   * param1 (type): Description.
   *
   * Returns:
   * type: Description.
   */
📚 Documentation & Explainability
Update README.md when new features are added, dependencies change, or assets are modified.

Comment non-obvious code and ensure everything is understandable to a mid-level developer.

When writing complex logic or physics constants, add an inline # Reason: comment explaining the why, not just the what.

🧠 AI Behavior Rules
Never assume missing context. Ask questions if uncertain.

Never hallucinate libraries or functions – use context7 MCP to verify current Framer Motion or Next.js syntax.

Always confirm file paths and module names exist before referencing them in code or tests.

Maintain the Brazilian "Vibe": Ensure all UI feedback and exclamations (e.g., "Mamma Mia!", "Partiu!") are randomized and culturally consistent.

Never delete or overwrite existing code unless explicitly instructed to or if part of a task from TASK.md.