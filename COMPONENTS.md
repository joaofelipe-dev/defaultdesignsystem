# 🧱 defaultDesignSystem - Documentação de Componentes

Bem-vindo à documentação oficial do `defaultDesignSystem`. Todos os componentes foram construídos utilizando Tailwind CSS, são totalmente acessíveis, responsivos e suportam customizações via a propriedade `className` (graças ao utilitário `cn` embutido).

Abaixo você encontra um resumo rápido de cada componente, o que eles fazem e suas principais propriedades (props).

---

## 1. Input (`<Input />`)
Um campo de entrada de texto padronizado com suporte para ícones.

- **`variant`**: Estilo do campo (`"default" | "filled" | "outline" | "ghost"`)
- **`size`**: Tamanho do input (`"sm" | "md" | "lg"`)
- **`status`**: Indicador visual de estado (`"default" | "error" | "success" | "warning"`)
- **`fullWidth`** (`boolean`): Se `true`, ocupa 100% da largura.
- **`leftIcon` / `rightIcon`**: Aceita elementos React (ex: SVGs) para serem exibidos dentro do input.

---

## 2. Select (`<Select />`)
Um menu dropdown clássico.

- **`variant`**: Estilo do campo (`"default" | "outline" | "filled"`)
- **`size`**: Tamanho do componente (`"sm" | "md" | "lg"`)
- **`status`**: Indicador visual de estado (`"error" | "success" | "default"`)
- **`multiple`** (`boolean`): Se `true`, permite selecionar múltiplas opções.

---

## 3. Modal (`<Modal />`)
Janelas de diálogo sobrepostas ao conteúdo principal.

- **`open`** (`boolean`): *Obrigatório*. Controla a visibilidade do modal.
- **`onClose`**: Função acionada ao tentar fechar o modal.
- **`size`**: Largura máxima (`"sm" | "md" | "lg" | "xl" | "full"`).
- **`variant`**: Como ele é renderizado na tela (`"default" | "fullscreen" | "centered"`).
- **`closeOnOverlayClick` / `closeOnEsc`** (`boolean`): Permite que o modal feche automaticamente em interações do usuário.
- **`title` / `description`**: Cabeçalho do modal.

---

## 4. Card (`<Card />`)
Contêiner genérico flexível para agrupar conteúdo relacionado.

- **`variant`**: Estilo visual (`"default" | "outlined" | "elevated"`).
- **`padding`**: Espaçamento interno padronizado (`"none" | "sm" | "md" | "lg"`).
- **`interactive`** (`boolean`): Se `true`, adiciona um sútil efeito de hover e transição.
- **`fullWidth`** (`boolean`): Força 100% de largura no contêiner.

---

## 5. Table (`<Table />`)
Organização de dados de forma semântica.

- **`variant`**: Estilo das linhas e bordas (`"simple" | "striped" | "bordered"`).
- **`size`**: Densidade e espaçamento da tabela (`"sm" | "md" | "lg"`).
- **`hoverable`** (`boolean`): Ativa efeito de hover nas linhas de `tbody`.
- **`selectable`** (`boolean`): Aplica cursor pointer (indicando que a linha tem ação).
- **`loading`** (`boolean`): Exibe um overlay de carregamento sobre os dados.

---

## 6. Toast (`<Toast />`)
Notificações não-obstrutivas em formato "snack".

- **`message`**: *Obrigatório*. O texto exibido.
- **`variant`**: Cor/Significado da notificação (`"success" | "error" | "warning" | "info"`).
- **`duration`**: Tempo em milissegundos antes de sumir automático (padrão: `3000`).
- **`position`**: Onde aparece (`"top" | "bottom" | "top-right" | "bottom-right"`).
- **`closable`** (`boolean`): Permite que o usuário feche manualmente no botão de X.

---

## 7. Tooltip (`<Tooltip />`)
Dicas interativas flutuantes ao passar o mouse ou focar um elemento.

- **`content`**: *Obrigatório*. O que aparecerá no balão.
- **`position`**: Onde será ancorado (`"top" | "bottom" | "left" | "right"`).
- **`variant`**: Estilo escuro ou claro (`"dark" | "light"`).
- **`delay`**: Milissegundos antes de aparecer o balão (padrão `200`).
- **`disabled`** (`boolean`): Permite desligar temporariamente a exibição do tooltip.

---

## 8. Tabs (`<Tabs />`)
Alternância de contexto entre diferentes painéis em um mesmo espaço.

- **`tabs`**: *Obrigatório*. Um array contendo os dados (ex: `[{ id, label, content }]`).
- **`variant`**: Estilo dos botões (`"line" | "solid" | "pills"`).
- **`orientation`**: Vertical ou Horizontal (`"horizontal" | "vertical"`).
- **`fullWidth`** (`boolean`): Se `true`, distribui as abas ocupando todo o espaço em largura.
- **`defaultTab`**: ID da tab selecionada inicialmente.

---

## 9. Accordion (`<Accordion />`)
Painéis colapsáveis (ideal para FAQs).

- **`items`**: *Obrigatório*. Um array com as opções (ex: `[{ id, title, content }]`).
- **`variant`**: Visualização (`"default" | "bordered" | "separated"`).
- **`multiple`** (`boolean`): Se `true`, o usuário pode abrir mais de um item por vez.
- **`collapsible`** (`boolean`): Permite fechar o item aberto se ele for clicado de novo.
- **`defaultOpen`**: Array de IDs que devem nascer abertos.

---

## 10. Spinner (`<Spinner />`)
Indicador de progresso/carregamento.

- **`variant`**: O tipo da animação (`"circular" | "dots" | "bars"`).
- **`size`**: Tamanho (`"sm" | "md" | "lg"`).
- **`color`**: Cor do elemento (`"primary" | "neutral" | "white"`).

---

## 11. Switch (`<Switch />`)
Toggle de alternância binária (On/Off).

- **`checked`** (`boolean`): Estado nativo do toggle.
- **`disabled`** (`boolean`): Desativa a interação com o switch.
- **`size`**: O quão grande a "cápsula" é (`"sm" | "md" | "lg"`).
- **`color`**: Cor quando está ativado (`"primary" | "success" | "danger"`).

---

## 12. Checkbox (`<Checkbox />`)
Um ou múltiplos selects de dados booleanos.

- **`checked`** (`boolean`): Estado de checagem.
- **`disabled`** (`boolean`): Desativa a interação com a caixinha.
- **`size`**: Dimensões da caixinha (`"sm" | "md" | "lg"`).
- **`indeterminate`** (`boolean`): Se verdadeiro, mostra aquele tracinho (estado parcialmente selecionado) na UI.

---

## 13. RadioGroup (`<RadioGroup />`)
Conjunto de botões de rádio para uma escolha de várias opções.

- **`name`**: Nome de formulário do agrupamento.
- **`options`**: Array configurado com (`[{ label, value, disabled }]`).
- **`orientation`**: Direção de renderização (`"horizontal" | "vertical"`).
- **`disabled`** (`boolean`): Se `true`, desativa todo o grupo.

---

## 14. Badge (`<Badge />`)
Selo indicativo (ideal para rótulos, novos itens, etc).

- **`variant`**: Como a cor preenche (`"solid" | "outline" | "soft"`).
- **`color`**: Semântica de cor (`"primary" | "success" | "warning" | "danger"`).
- **`size`**: Tamanho da fonte e margens (`"sm" | "md" | "lg"`).

---

## 15. Avatar (`<Avatar />`)
Representação de uma entidade. Pode ser imagem ou inicias (fallback).

- **`fallback`**: *Obrigatório*. Um texto exibido caso falhe a imagem (ex: "JF").
- **`src`**: O link da foto.
- **`size`**: Tamanhos variados de avatar.
- **`shape`**: Arredondamento (`"circle" | "square"`).
- **`status`**: Uma pequena bolinha colorida indicando contexto (`"online" | "offline" | "busy"`).

---

## 16. Divider (`<Divider />`)
Linhas de separação estrutural para melhor organização do visual.

- **`orientation`**: Sentido (`"horizontal" | "vertical"`).
- **`variant`**: Traço contínuo ou tracejado (`"solid" | "dashed"`).
- **`spacing`**: Distância de margem nas pontas (`"sm" | "md" | "lg"`).

---

## 17. Button (`<Button />`)
Botão interativo com diversas variações visuais.

- **`variant`**: Estilo base do botão (`"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`).
- **`size`**: Tamanhos padrão (`"default" | "sm" | "lg" | "icon"`).
- **`fullWidth`** (`boolean`): Se `true`, expande o botão para ocupar 100% da largura.

---

## 📖 Storybook

Todas as stories estão em `templates/stories/` e podem ser visualizadas com:

```bash
npm run storybook    # Dev server em http://localhost:6006
npm run build-storybook  # Build estático em storybook-static/
```

Cada componente possui stories demonstrando variantes, tamanhos, estados e interatividade.

---

## 🎨 Theming com CSS Variables

O design system utiliza **CSS Variables** para theming completo. As variáveis são definidas em `src/styles/globals.css` e mapeadas via `tailwind-preset.js`.

### Cores disponíveis

| Variável | Uso |
|---|---|
| `--background` / `--foreground` | Fundo e texto principal |
| `--primary` / `--primary-foreground` | Cor primária (botões, links) |
| `--secondary` / `--secondary-foreground` | Cor secundária |
| `--destructive` / `--destructive-foreground` | Ações destrutivas (erro) |
| `--success` / `--success-foreground` | Estados de sucesso |
| `--warning` / `--warning-foreground` | Estados de aviso |
| `--muted` / `--muted-foreground` | Elementos atenuados |
| `--accent` / `--accent-foreground` | Destaques (hover, ghost) |
| `--border` / `--input` | Bordas e inputs |
| `--ring` | Foco (focus ring) |

### Dark mode

Ative adicionando a classe `.dark` no elemento `<html>`. O tailwind-preset.js já suporta:

```css
/* Nos seus styles globais */
@layer base {
  :root { /* cores do tema claro */ }
  .dark  { /* cores do tema escuro */ }
}
```

### Dica de ouro
Você sempre pode passar uma string extra via `className` para qualquer componente. Todos eles usam `cn(..., className)`, então você consegue facilmente sobrescrever cores, margens, display com facilidade utilizando as classes do TailwindCSS de onde você importá-lo!
