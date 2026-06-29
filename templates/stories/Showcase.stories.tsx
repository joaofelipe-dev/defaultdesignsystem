import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { RadioGroup } from '../ui/RadioGroup';
import { Switch } from '../ui/Switch';
import { Toast } from '../ui/Toast';
import { Modal } from '../ui/Modal';
import { Spinner } from '../ui/Spinner';
import { Tooltip } from '../ui/Tooltip';
import { Tabs } from '../ui/Tabs';
import { Accordion } from '../ui/Accordion';
import { Table } from '../ui/Table';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { Avatar } from '../ui/Avatar';

const CATEGORIES = [
  { id: 'actions', label: 'Actions', components: ['Button', 'Badge'] },
  { id: 'forms', label: 'Forms', components: ['Input', 'Select', 'Checkbox', 'RadioGroup', 'Switch'] },
  { id: 'feedback', label: 'Feedback', components: ['Toast', 'Modal', 'Spinner', 'Tooltip'] },
  { id: 'navigation', label: 'Navigation', components: ['Tabs', 'Accordion'] },
  { id: 'data', label: 'Data', components: ['Table'] },
  { id: 'layout', label: 'Layout', components: ['Card', 'Divider', 'Avatar'] },
] as const;

function useIntersection(threshold = 0.15) {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback((_id: string, el: HTMLElement | null) => {
    if (!el) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => new Set(prev).add(entry.target.id));
            }
          });
        },
        { threshold }
      );
    }
    observerRef.current.observe(el);
  }, [threshold]);

  return { visible, observe };
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative group">
      <pre className="bg-zinc-900 text-zinc-100 text-xs leading-relaxed p-3 pr-10 rounded-lg overflow-x-auto">{code}</pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-zinc-700 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return { dark, setDark };
}

const accordionItems = [
  { id: 'faq1', title: 'What is this design system?', content: 'A set of React components styled with Tailwind CSS, copied directly to your project via CLI. Full ownership, zero vendor lock-in.' },
  { id: 'faq2', title: 'How do I customize colors?', content: 'All colors are CSS variables in globals.css. Change the HSL values to create your own theme.' },
  { id: 'faq3', title: 'Does it support dark mode?', content: 'Yes! Add the .dark class to &lt;html&gt; and dark variables apply automatically.' },
];

const tabs = [
  { id: 'tab1', label: 'Preview', content: <div className="py-4 text-foreground">Preview tab content. See your components in action.</div> },
  { id: 'tab2', label: 'Code', content: <div className="py-4 text-foreground">Code tab content. Usage examples and snippets.</div> },
  { id: 'tab3', label: 'Props', content: <div className="py-4 text-foreground">Props tab content. Full API reference.</div> },
];

const tableData = [
  { name: 'Joao Silva', email: 'joao@example.com', role: 'Admin', status: 'Active' },
  { name: 'Maria Souza', email: 'maria@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carlos Lima', email: 'carlos@example.com', role: 'Viewer', status: 'Inactive' },
];

function Section({ id, title, children, observe, visible }: { id: string; title: string; children: React.ReactNode; observe: (id: string, el: HTMLElement | null) => void; visible: boolean }) {
  return (
    <section
      id={id}
      ref={(el) => observe(id, el)}
      data-visible={visible}
      className="scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <Divider spacing="sm" />
      </div>
      {children}
    </section>
  );
}

function Gallery() {
  const { dark, setDark } = useDarkMode();
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; variant: 'success' | 'error' | 'warning' | 'info'; message: string }[]>([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');

  const addToast = (variant: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setToasts((prev) => [...prev, { id: Date.now(), variant, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const { visible, observe } = useIntersection(0.1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const links = CATEGORIES.flatMap((c) => c.components).map((c) => c.toLowerCase());
      const idx = links.indexOf(document.activeElement?.id?.toLowerCase() ?? '');
      if (e.key === 'ArrowDown' && idx < links.length - 1) {
        e.preventDefault();
        scrollTo(links[idx + 1]);
      }
      if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault();
        scrollTo(links[idx - 1]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    CATEGORIES.flatMap((c) => c.components).forEach((id) => {
      const el = document.getElementById(id.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant} message={t.message} duration={3000} onClose={() => removeToast(t.id)} />
      ))}

      <div className="flex">
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 bg-zinc-950 text-zinc-300 z-50 border-r border-zinc-800">
          <div className="px-5 pt-6 pb-4 border-b border-zinc-800">
            <p className="text-sm font-semibold text-white tracking-tight">defaultDesignSystem</p>
            <p className="text-xs text-zinc-500 mt-0.5">17 components</p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4 text-sm scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-2 mb-1.5">{cat.label}</p>
                {cat.components.map((comp) => (
                  <button
                    key={comp}
                    id={comp.toLowerCase()}
                    onClick={() => scrollTo(comp.toLowerCase())}
                    data-active={activeSection === comp.toLowerCase()}
                    className="block w-full text-left px-2 py-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors data-[active=true]:text-white data-[active=true]:bg-zinc-800 text-xs"
                  >
                    {comp}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="px-4 pb-4 pt-3 border-t border-zinc-800">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-full"
            >
              <span className="text-base leading-none">{dark ? '\u2600' : '\uD83C\uDF19'}</span>
              {dark ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </aside>

        <main className="flex-1 lg:ml-56">
          <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
                defaultDesignSystem
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                React components styled with Tailwind CSS. Copied to your project via CLI.
                Full ownership, zero vendor lock-in.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="soft" color="primary">React 19</Badge>
                <Badge variant="soft" color="primary">Tailwind CSS</Badge>
                <Badge variant="soft" color="primary">TypeScript</Badge>
                <Badge variant="soft" color="primary">Accessible</Badge>
                <Badge variant="soft" color="primary">17 Components</Badge>
              </div>
            </div>

            <div className="lg:hidden flex justify-center mb-10 gap-2">
              <Button size="sm" variant={dark ? 'outline' : 'default'} onClick={() => setDark(!dark)}>
                {dark ? 'Light mode' : 'Dark mode'}
              </Button>
            </div>

            {CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id} className="mb-16">
                {cat.components.map((comp) => {
                  const id = comp.toLowerCase();
                  return (
                    <div key={comp} id={id}>
                      <Section id={`${id}-content`} title={comp} observe={observe} visible={visible.has(`${id}-content`)}>
                        {comp === 'Button' && <ButtonShowcase />}
                        {comp === 'Badge' && <BadgeShowcase />}
                        {comp === 'Input' && <InputShowcase />}
                        {comp === 'Select' && <SelectShowcase />}
                        {comp === 'Checkbox' && <CheckboxShowcase checked={checkboxChecked} onChange={setCheckboxChecked} />}
                        {comp === 'RadioGroup' && <RadioGroupShowcase value={radioValue} onChange={setRadioValue} />}
                        {comp === 'Switch' && <SwitchShowcase checked={switchChecked} onChange={setSwitchChecked} />}
                        {comp === 'Toast' && <ToastShowcase onAdd={addToast} />}
                        {comp === 'Modal' && <ModalShowcase open={modalOpen} onOpen={setModalOpen} />}
                        {comp === 'Spinner' && <SpinnerShowcase />}
                        {comp === 'Tooltip' && <TooltipShowcase />}
                        {comp === 'Tabs' && <TabsShowcase />}
                        {comp === 'Accordion' && <AccordionShowcase />}
                        {comp === 'Table' && <TableShowcase />}
                        {comp === 'Card' && <CardShowcase />}
                        {comp === 'Divider' && <DividerShowcase />}
                        {comp === 'Avatar' && <AvatarShowcase />}
                      </Section>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ButtonShowcase() {
  const [variant, setVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');
  const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default');

  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-1 flex-wrap">
          {(['default', 'outline', 'secondary', 'ghost', 'link', 'destructive'] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={`px-2.5 py-1 text-xs rounded-md transition-all ${variant === v ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{v}</button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {(['sm', 'default', 'lg'] as const).map((s) => (
            <button key={s} onClick={() => setSize(s)} className={`px-2.5 py-1 text-xs rounded-md transition-all ${size === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant={variant} size={size}>Button</Button>
        <Button variant={variant} size={size} disabled>Disabled</Button>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Button variant="${variant}" size="${size}">Button</Button>`} />
      </div>
    </Card>
  );
}

function BadgeShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Solid</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="solid" color={c}>{c}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Outline</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="outline" color={c}>{c}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Soft</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="soft" color={c}>{c}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Badge variant="solid" color="primary">Badge</Badge>`} />
      </div>
    </Card>
  );
}

function InputShowcase() {
  const [variant, setVariant] = useState<'default' | 'filled' | 'outline' | 'ghost'>('default');

  return (
    <Card variant="outlined" padding="lg">
      <div className="flex gap-1 flex-wrap mb-4">
        {(['default', 'filled', 'outline', 'ghost'] as const).map((v) => (
          <button key={v} onClick={() => setVariant(v)} className={`px-2.5 py-1 text-xs rounded-md transition-all ${variant === v ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{v}</button>
        ))}
      </div>
      <div className="space-y-3 max-w-sm">
        <Input variant={variant} placeholder="Default input" />
        <Input variant={variant} placeholder="With error" status="error" />
        <Input variant={variant} placeholder="Success" status="success" />
        <Input variant={variant} size="sm" placeholder="Small size" />
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Input variant="${variant}" placeholder="Input" />`} />
      </div>
    </Card>
  );
}

function SelectShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap gap-3 max-w-xs">
        <Select className="max-w-[200px]">
          <option>Default</option>
          <option>Option A</option>
          <option>Option B</option>
        </Select>
        <Select status="error" className="max-w-[200px]">
          <option>With error</option>
        </Select>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Select>\n  <option>Option</option>\n</Select>`} />
      </div>
    </Card>
  );
}

function CheckboxShowcase({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={checked} onChange={() => onChange(!checked)} />
          <span className="text-sm text-foreground">{checked ? 'Checked' : 'Unchecked'}</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox indeterminate />
          <span className="text-sm text-foreground">Indeterminate</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox disabled />
          <span className="text-sm text-muted-foreground">Disabled</span>
        </label>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Checkbox checked={checked} onChange={setChecked} />`} />
      </div>
    </Card>
  );
}

function RadioGroupShowcase({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Card variant="outlined" padding="lg">
      <RadioGroup
        name="gallery-radio"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3 (disabled)', value: 'option3', disabled: true },
        ]}
        value={value}
        onChange={onChange}
        orientation="horizontal"
      />
      <div className="mt-3">
        <CodeBlock code={`<RadioGroup name="group" options={[\n  { label: "Option 1", value: "opt1" },\n]} />`} />
      </div>
    </Card>
  );
}

function SwitchShowcase({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <Switch checked={checked} onChange={() => onChange(!checked)} />
          <span className="text-sm text-foreground">{checked ? 'On' : 'Off'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked color="success" size="lg" onChange={() => {}} />
          <span className="text-sm text-foreground">Success (large)</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={false} disabled />
          <span className="text-sm text-muted-foreground">Disabled</span>
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Switch checked={checked} onChange={setChecked} />`} />
      </div>
    </Card>
  );
}

function ToastShowcase({ onAdd }: { onAdd: (variant: 'success' | 'error' | 'warning' | 'info', msg: string) => void }) {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => onAdd('success', 'Operation completed successfully!')}>Success</Button>
        <Button variant="destructive" onClick={() => onAdd('error', 'Error processing request.')}>Error</Button>
        <Button variant="secondary" onClick={() => onAdd('warning', 'Resource running low.')}>Warning</Button>
        <Button variant="outline" onClick={() => onAdd('info', 'New version available.')}>Info</Button>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Toast variant="success" message="Done!" duration={3000} />`} />
      </div>
    </Card>
  );
}

function ModalShowcase({ open, onOpen }: { open: boolean; onOpen: (v: boolean) => void }) {
  return (
    <Card variant="outlined" padding="lg">
      <Button onClick={() => onOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => onOpen(false)} title="Modal Title" description="Optional description" size="md">
        <p className="text-foreground mb-4">Modal content goes here. Click outside or press Esc to close.</p>
        <Button onClick={() => onOpen(false)}>Close</Button>
      </Modal>
      <div className="mt-3">
        <CodeBlock code={`<Modal open={open} onClose={() => setOpen(false)} title="Title">\n  <p>Content</p>\n</Modal>`} />
      </div>
    </Card>
  );
}

function SpinnerShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Circular</p>
          <div className="flex items-center gap-4">
            <Spinner variant="circular" size="sm" />
            <Spinner variant="circular" size="md" />
            <Spinner variant="circular" size="lg" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Dots & Bars</p>
          <div className="flex items-center gap-4">
            <Spinner variant="dots" size="md" />
            <Spinner variant="bars" size="md" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Spinner variant="circular" size="md" />`} />
      </div>
    </Card>
  );
}

function TooltipShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="flex flex-wrap gap-3">
        <Tooltip content="Tooltip on top" position="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip content="Tooltip on bottom" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip content="Tooltip on left" position="left"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip content="Tooltip on right" position="right"><Button variant="outline">Right</Button></Tooltip>
        <Tooltip content="Disabled tooltip" disabled><Button variant="ghost">Disabled</Button></Tooltip>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Tooltip content="Tooltip text" position="top">\n  <Button>Hover me</Button>\n</Tooltip>`} />
      </div>
    </Card>
  );
}

function TabsShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Line variant</p>
          <Tabs tabs={tabs} variant="line" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Pills variant</p>
          <Tabs tabs={tabs} variant="pills" />
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Tabs tabs={tabs} variant="line" />`} />
      </div>
    </Card>
  );
}

function AccordionShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="max-w-lg">
        <Accordion items={accordionItems} variant="default" />
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Accordion items={items} variant="default" />`} />
      </div>
    </Card>
  );
}

function TableShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <Table variant="simple">
        <thead>
          <tr>
            <th className="text-left font-medium text-muted-foreground">Name</th>
            <th className="text-left font-medium text-muted-foreground">Email</th>
            <th className="text-left font-medium text-muted-foreground">Role</th>
            <th className="text-left font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.name}>
              <td className="text-foreground">{row.name}</td>
              <td className="text-muted-foreground">{row.email}</td>
              <td><Badge color="primary" size="sm">{row.role}</Badge></td>
              <td><Badge color={row.status === 'Active' ? 'success' : 'warning'} size="sm">{row.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <CodeBlock code={`<Table variant="simple">\n  <thead>...</thead>\n  <tbody>...</tbody>\n</Table>`} />
      </div>
    </Card>
  );
}

function CardShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" padding="md">
          <p className="text-foreground font-medium">Default</p>
          <p className="text-muted-foreground text-sm mt-1">With border and shadow.</p>
        </Card>
        <Card variant="outlined" padding="md">
          <p className="text-foreground font-medium">Outlined</p>
          <p className="text-muted-foreground text-sm mt-1">Double border.</p>
        </Card>
        <Card variant="elevated" padding="md">
          <p className="text-foreground font-medium">Elevated</p>
          <p className="text-muted-foreground text-sm mt-1">Shadow only.</p>
        </Card>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Card variant="default" padding="md">\n  <p>Content</p>\n</Card>`} />
      </div>
    </Card>
  );
}

function DividerShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="max-w-sm">
        <p className="text-foreground text-sm">Above solid divider</p>
        <Divider variant="solid" spacing="md" />
        <p className="text-foreground text-sm">Above dashed divider</p>
        <Divider variant="dashed" spacing="md" />
        <div className="flex items-center h-12">
          <span className="text-foreground text-sm">Left</span>
          <Divider orientation="vertical" spacing="md" />
          <span className="text-foreground text-sm">Center</span>
          <Divider orientation="vertical" variant="dashed" spacing="md" />
          <span className="text-foreground text-sm">Right</span>
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Divider variant="solid" spacing="md" />`} />
      </div>
    </Card>
  );
}

function AvatarShowcase() {
  return (
    <Card variant="outlined" padding="lg">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Sizes</p>
          <div className="flex items-center gap-3">
            <Avatar fallback="JF" size="sm" />
            <Avatar fallback="MS" size="md" />
            <Avatar fallback="CL" size="lg" />
            <Avatar fallback="AD" size="xl" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Status indicators</p>
          <div className="flex items-center gap-3">
            <Avatar fallback="ON" status="online" />
            <Avatar fallback="OF" status="offline" />
            <Avatar fallback="BS" status="busy" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">With image & shapes</p>
          <div className="flex items-center gap-3">
            <Avatar src="https://i.pravatar.cc/150?u=avatar1" fallback="U1" size="lg" />
            <Avatar fallback="SQ" shape="square" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Avatar fallback="JF" size="md" status="online" />`} />
      </div>
    </Card>
  );
}

const meta: Meta = {
  title: 'Showcase/All Components',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Showcase = {
  render: () => <Gallery />,
};
