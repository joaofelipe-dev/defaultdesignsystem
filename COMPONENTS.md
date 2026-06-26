# Component Reference

All 17 components use the `cn` utility (clsx + tailwind-merge) for seamless className overrides.

---

## Input
`<Input />` -- Text field with icon support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "filled" \| "outline" \| "ghost"` | `"default"` | Visual style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| status | `"default" \| "error" \| "success" \| "warning"` | `"default"` | Validation state |
| fullWidth | `boolean` | `false` | Stretch to 100% width |
| leftIcon | `ReactNode` | -- | Icon inside left side |
| rightIcon | `ReactNode` | -- | Icon inside right side |

---

## Select
`<Select />` -- Dropdown menu.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "outline" \| "filled"` | `"default"` | Visual style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Select size |
| status | `"error" \| "success" \| "default"` | `"default"` | Validation state |
| multiple | `boolean` | `false` | Allow multiple selection |

---

## Modal
`<Modal />` -- Dialog overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | (required) | Visibility control |
| onClose | `() => void` | -- | Close handler |
| size | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Max width |
| variant | `"default" \| "fullscreen" \| "centered"` | `"default"` | Layout variant |
| closeOnOverlayClick | `boolean` | `true` | Close on backdrop click |
| closeOnEsc | `boolean` | `true` | Close on Escape key |
| title | `string` | -- | Modal header |
| description | `string` | -- | Modal description |

---

## Card
`<Card />` -- Content container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "outlined" \| "elevated"` | `"default"` | Visual style |
| padding | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Inner spacing |
| interactive | `boolean` | `false` | Hover effect |
| fullWidth | `boolean` | `false` | 100% width |

---

## Table
`<Table />` -- Semantic data table.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"simple" \| "striped" \| "bordered"` | `"simple"` | Row/border style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Density |
| hoverable | `boolean` | `false` | Row hover effect |
| selectable | `boolean` | `false` | Pointer cursor |
| loading | `boolean` | `false` | Loading overlay |

---

## Toast
`<Toast />` -- Non-blocking notification.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | `string` | (required) | Notification text |
| variant | `"success" \| "error" \| "warning" \| "info"` | `"info"` | Color/meaning |
| duration | `number` | `3000` | Auto-dismiss ms |
| position | `"top" \| "bottom" \| "top-right" \| "bottom-right"` | `"top-right"` | Screen position |
| closable | `boolean` | `true` | Show close button |

---

## Tooltip
`<Tooltip />` -- Floating hint on hover/focus.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `string` | (required) | Tooltip text |
| position | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Anchor position |
| variant | `"dark" \| "light"` | `"dark"` | Color scheme |
| delay | `number` | `200` | Show delay in ms |
| disabled | `boolean` | `false` | Temporarily disable |

---

## Tabs
`<Tabs />` -- Context switcher between panels.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | `{ id, label, content }[]` | (required) | Tab definitions |
| variant | `"line" \| "solid" \| "pills"` | `"line"` | Tab style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Tab size |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| fullWidth | `boolean` | `false` | Stretch to full width |
| defaultTab | `string` | first tab | Initially selected tab |

---

## Accordion
`<Accordion />` -- Collapsible panels.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `{ id, title, content }[]` | (required) | Panel definitions |
| variant | `"default" \| "bordered" \| "separated"` | `"default"` | Visual style |
| multiple | `boolean` | `false` | Allow multiple open |
| collapsible | `boolean` | `true` | Allow closing open item |
| defaultOpen | `string[]` | `[]` | Initially open IDs |

---

## Spinner
`<Spinner />` -- Loading indicator.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"circular" \| "dots" \| "bars"` | `"circular"` | Animation type |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Spinner size |
| color | `"primary" \| "neutral" \| "white"` | `"primary"` | Color |

---

## Switch
`<Switch />` -- Binary toggle.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | `false` | Toggle state |
| disabled | `boolean` | `false` | Disable interaction |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Capsule size |
| color | `"primary" \| "success" \| "danger"` | `"primary"` | Active color |

---

## Checkbox
`<Checkbox />` -- Boolean checkbox.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | `false` | Checked state |
| disabled | `boolean` | `false` | Disable interaction |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Checkbox size |
| indeterminate | `boolean` | `false` | Partial selection |

---

## RadioGroup
`<RadioGroup />` -- Radio button group.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | (required) | Form name |
| options | `{ label, value, disabled? }[]` | (required) | Radio options |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Radio size |
| orientation | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction |
| disabled | `boolean` | `false` | Disable all radios |
| value | `string` | -- | Currently selected value |
| onChange | `(value: string) => void` | -- | Selection handler |

---

## Badge
`<Badge />` -- Status indicator label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"solid" \| "outline" \| "soft"` | `"solid"` | Fill style |
| color | `"primary" \| "success" \| "warning" \| "danger"` | `"primary"` | Semantic color |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Font and padding |

---

## Avatar
`<Avatar />` -- Entity representation (image or initials).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fallback | `string` | (required) | Text shown when image fails |
| src | `string` | -- | Image URL |
| size | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar size |
| shape | `"circle" \| "square"` | `"circle"` | Border radius |
| status | `"online" \| "offline" \| "busy"` | -- | Status dot |

---

## Divider
`<Divider />` -- Structural separator.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Direction |
| variant | `"solid" \| "dashed"` | `"solid"` | Line style |
| spacing | `"sm" \| "md" \| "lg"` | `"md"` | Margin size |

---

## Button
`<Button />` -- Interactive button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style |
| size | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| fullWidth | `boolean` | `false` | 100% width |
