# Contribuindo

## Setup

```bash
git clone <repo>
npm install
```

## Desenvolvimento

```bash
npm run storybook    # Dev server em http://localhost:6006
npm test             # Rodar testes
npm run typecheck    # Verificar tipos
npm run lint         # Verificar lint
```

## Adicionando um componente

1. Crie `templates/ui/MeuComponente.tsx` — siga o padrão dos existentes:
   - `'use client'` no topo se usar hooks (useState, useEffect, useRef, etc.)
   - `React.forwardRef` se fizer sentido ter ref
   - Props com `cn()` pra aceitar `className`
   - `aria-*` attributes pra acessibilidade

2. Crie `templates/ui/MeuComponente.test.tsx` — testes de render, variantes, eventos

3. Crie `templates/stories/MeuComponente.stories.tsx` — pelo menos variantes principais

4. Atualize `COMPONENTS.md` com a documentação

5. Rode verificação:
   ```bash
   npm run typecheck && npm test && npm run lint
   ```

## CLI

O CLI em `bin/cli.js` copia arquivos de `templates/` pro projeto alvo. Se mudar a estrutura de arquivos, atualize o CLI também.

## Pull Requests

- Uma mudança por PR
- Testes passando
- Typecheck passando
- Lint limpo
