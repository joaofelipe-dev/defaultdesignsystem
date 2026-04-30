# defaultDesignSystem 🧱

**defaultDesignSystem** é uma biblioteca de componentes React estilizada com Tailwind CSS, focada em produtividade e total controle do código.

Em vez de ser instalada como uma dependência obscura dentro da pasta `node_modules`, este repositório funciona como uma ferramenta CLI (Command Line Interface). Ao executar os comandos, os componentes que você escolher (ou a suíte inteira) são "injetados" diretamente dentro da pasta do seu projeto (em `src/components/ui/`), dando a você **100% de controle para modificar, ajustar e estender** o código como preferir.

Todos os 17 componentes já vêm prontos, acessíveis e desenhados seguindo as melhores práticas do mercado, além de fazerem uso inteligente do utilitário `cn` (que combina `clsx` e `tailwind-merge` para evitar conflitos de classes).

Para ver a lista detalhada de componentes e suas propriedades, consulte o nosso [COMPONENTS.md](./COMPONENTS.md).

---

## 🚀 Como instalar e usar

Você não precisa baixar o repositório inteiro ou se preocupar com `npm install`. Basta usar o `npx` apontando diretamente para o link do repositório no GitHub de dentro do seu projeto React ou Next.js:

### 1. Inicialize o Design System no seu projeto
O comando abaixo cria as pastas necessárias (`src/components/ui`), adiciona o utilitário `cn.ts` e instala as dependências auxiliares requeridas pelo Tailwind.

```bash
npx git+https://github.com/joaofelipe-dev/defaultdesignsystem.git init
```

### 2. Adicione componentes
Com a estrutura pronta, você pode ejetar componentes individuais para dentro do seu projeto:

```bash
npx git+https://github.com/joaofelipe-dev/defaultdesignsystem.git add Button
```
*(No exemplo acima, o componente Button será copiado para o seu projeto em `src/components/ui/Button.tsx`)*

### 3. Quer tudo de uma vez?
Se você for usar a biblioteca inteira, você pode baixar todos os 17 componentes de uma só vez usando o parâmetro `all`:

```bash
npx git+https://github.com/joaofelipe-dev/defaultdesignsystem.git add all
```

E pronto! É só importar o componente gerado no seu código e começar a construir.
