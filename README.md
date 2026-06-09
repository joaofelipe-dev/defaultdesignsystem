# defaultDesignSystem

Biblioteca de componentes React com Tailwind CSS, instalada via CLI — o código é copiado direto para seu projeto, dando 100% de controle.

Todos os 17 componentes usam o utilitário `cn` (clsx + tailwind-merge).

Para detalhes de cada componente, veja [COMPONENTS.md](./COMPONENTS.md).

---

## Instalação

Dentro do seu projeto React/Next.js:

```bash
npm install github:joaofelipe-dev/defaultdesignsystem
npx defaultdesignsystem init
```

O `init` detecta automaticamente:
- **Framework**: Next.js (copia para `src/app/`) ou Vite (copia para `src/styles/`)
- **Tailwind v3 vs v4**: v4 gera `globals.css` com `@import "tailwindcss"` + `@theme` (sem preset extra)

Por padrão o tema **default** (zinc) é aplicado. Para escolher outro tema já no init:

```bash
npx defaultdesignsystem init --theme green
```

Temas disponíveis: `default`, `green`, `violet`, `orange`, `neutral`

### Pós-instalação

Importe os estilos no entry point do seu projeto.

**Next.js** (`src/app/layout.tsx`):
```ts
import "./globals.css"
import "./theme-green.css"
```

**Vite** (`src/main.tsx`):
```ts
import "./styles/globals.css"
import "./styles/theme-green.css"
```

### Tailwind v3 — config extra

Se seu projeto usa Tailwind v3, crie um `postcss.config.cjs` e `tailwind.config.cjs` no raiz:

<details>
<summary>postcss.config.cjs</summary>

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
</details>

<details>
<summary>tailwind.config.cjs</summary>

```js
const { defaultDesignSystem } = require("defaultdesignsystem/tailwind-preset.cjs")

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaultDesignSystem],
  content: ["./src/**/*.{ts,tsx}"],
}
```
</details>

**Tailwind v4 não precisa de config extra** — o `@theme` no `globals.css` resolve automaticamente.

---

## Adicionar componentes

```bash
npx defaultdesignsystem add Button
npx defaultdesignsystem add all     # todos os 17 componentes
```

Os componentes são copiados para `src/components/ui/`.

---

## Reset styles (opcional)

Se quiser reset CSS global além do Tailwind, crie um `src/styles/reset.css`:

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Importe antes do globals.css no entry point.

---

## Temas personalizados

Para criar seu próprio tema, crie um arquivo CSS com as variáveis que deseja sobrescrever:

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

E importe após o `globals.css`.
