# @joaofelipe-dev/defaultdesignsystem

React component library with Tailwind CSS. Install via CLI -- the source is copied directly to your project, giving you full ownership and zero vendor lock-in. 17 accessible components, all typed with TypeScript.

```bash
npx @joaofelipe-dev/defaultdesignsystem init
npx @joaofelipe-dev/defaultdesignsystem add Button
npx @joaofelipe-dev/defaultdesignsystem add all
```

Todos os 17 componentes usam o utilitário `cn` (clsx + tailwind-merge).

Para detalhes de cada componente, veja [COMPONENTS.md](./COMPONENTS.md), ou acesse o preview em https://joaofelipe-dev.github.io/defaultdesignsystem.

---

## Quick start

Inside your React/Next.js project:

```bash
npm install @joaofelipe-dev/defaultdesignsystem
npx defaultdesignsystem init
```

The `init` command detects:
- **Framework:** Next.js copies styles to `src/app/`, Vite to `src/styles/`
- **Tailwind version:** v4 generates `@import "tailwindcss"` + `@theme` (no extra config needed)

Choose a theme:

```bash
npx defaultdesignsystem init --theme green
```

Themes: `default`, `green`, `violet`, `orange`, `neutral`

### Import styles

**Next.js** (`src/app/layout.tsx`):
```ts
import "./globals.css"
import "./theme-default.css"
```

**Vite** (`src/main.tsx`):
```ts
import "./styles/globals.css"
import "./styles/theme-default.css"
```

---

## Tailwind v3

Projects on Tailwind v3 need two extra config files at the project root:

**postcss.config.cjs**
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.cjs**
```js
const preset = require("./tailwind-preset.cjs")

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
}
```

Tailwind v4 does not need extra config -- the `@theme` block in globals.css handles everything.

---

## Theming

Create a custom theme by overriding CSS variables:

```css
/* src/styles/theme-custom.css */
:root {
  --primary: 220 80% 50%;
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 220 70% 60%;
  --primary-foreground: 220 80% 10%;
}
```

Import it after globals.css.

---

## Component gallery

Run Storybook to browse an interactive gallery of all components:

```bash
npm run storybook
```

Or build the static site:

```bash
npm run build-storybook
```

---

## Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, patterns, and pull request workflow.

```bash
npm install        # install dependencies
npm run storybook  # start dev server (port 6006)
npm test           # run tests
npm run typecheck  # typeScript check
npm run lint       # lint check
```
