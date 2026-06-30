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
  { id: 'colors', label: 'Design Tokens', components: ['Color Palette'] },
  { id: 'actions', label: 'Actions', components: ['Button', 'Badge'] },
  {
    id: 'forms',
    label: 'Forms',
    components: ['Input', 'Select', 'Checkbox', 'RadioGroup', 'Switch'],
  },
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

  const observe = useCallback(
    (_id: string, el: HTMLElement | null) => {
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
          { threshold },
        );
      }
      observerRef.current.observe(el);
    },
    [threshold],
  );

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
      <pre className="bg-zinc-900 text-zinc-100 text-xs leading-relaxed p-3 pr-10 rounded-lg overflow-x-auto">
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-zinc-700 text-zinc-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-zinc-600"
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
  {
    id: 'faq1',
    title: 'What is this design system?',
    content:
      'A set of React components styled with Tailwind CSS, copied directly to your project via CLI. Full ownership, zero vendor lock-in.',
  },
  {
    id: 'faq2',
    title: 'How do I customize colors?',
    content:
      'All colors are CSS variables in globals.css. Change the HSL values to create your own theme.',
  },
  {
    id: 'faq3',
    title: 'Does it support dark mode?',
    content: 'Yes! Add the .dark class to &lt;html&gt; and dark variables apply automatically.',
  },
];

const tabs = [
  {
    id: 'tab1',
    label: 'Preview',
    content: (
      <div className="py-4 text-foreground">
        Preview tab content. See your components in action.
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Code',
    content: (
      <div className="py-4 text-foreground">Code tab content. Usage examples and snippets.</div>
    ),
  },
  {
    id: 'tab3',
    label: 'Props',
    content: <div className="py-4 text-foreground">Props tab content. Full API reference.</div>,
  },
];

const tableData = [
  { name: 'Joao Silva', email: 'joao@example.com', role: 'Admin', status: 'Active' },
  { name: 'Maria Souza', email: 'maria@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carlos Lima', email: 'carlos@example.com', role: 'Viewer', status: 'Inactive' },
];

function Section({
  id,
  title,
  children,
  observe,
  visible,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  observe: (id: string, el: HTMLElement | null) => void;
  visible: boolean;
}) {
  return (
    <section
      id={id}
      ref={(el) => observe(id, el)}
      data-visible={visible}
      className="scroll-mt-20 opacity-0 translate-y-4 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
        <Divider spacing="sm" />
      </div>
      {children}
    </section>
  );
}

export function Gallery() {
  const { dark, setDark } = useDarkMode();
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; variant: 'success' | 'error' | 'warning' | 'info'; message: string }[]
  >([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [themeOpen, setThemeOpen] = useState(false);
  const [lightColors, setLightColors] = useState<Record<string, string>>({...CSS_LIGHT});
  const [darkColors, setDarkColors] = useState<Record<string, string>>({...CSS_DARK});
  const [primaryHex, setPrimaryHex] = useState('#3b82f6');

  const applyTheme = useCallback((hex: string) => {
    const hsl = hexToHsl(hex);
    const fg = isLight(hex) ? '222.2 47.4% 11.2%' : '210 40% 98%';
    const upd: Record<string, string> = { '--primary': hsl, '--primary-foreground': fg, '--ring': hsl };
    setLightColors(prev => ({...prev, ...upd}));
    setDarkColors(prev => ({...prev, ...upd}));
    let style = document.getElementById('theme-override') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'theme-override';
      document.head.appendChild(style);
    }
    style.textContent = `:root{--primary:${hsl};--primary-foreground:${fg};--ring:${hsl}}.dark{--primary:${hsl};--primary-foreground:${fg};--ring:${hsl}}`;
  }, []);

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

  useEffect(() => {
    if (!themeOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#theme-menu') && !(e.target as HTMLElement).closest('.theme-btn')) setThemeOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setThemeOpen(false); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc); };
  }, [themeOpen]);

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    CATEGORIES.flatMap((c) => c.components).forEach((id) => {
      const el = document.getElementById(id.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          variant={t.variant}
          message={t.message}
          duration={3000}
          onClose={() => removeToast(t.id)}
        />
      ))}

      {/* Mobile nav toggle */}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-zinc-900 text-zinc-300"
        aria-label="Open navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside className="absolute left-0 top-0 h-full w-64 bg-zinc-950 text-zinc-300 border-r border-zinc-800 shadow-2xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-white tracking-tight">defaultDesignSystem</p>
                <p className="text-xs text-zinc-500 mt-0.5">18 components</p>
              </div>
              <button onClick={() => setMobileNavOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4 text-sm">
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-2 mb-1.5">
                    {cat.label}
                  </p>
                  {cat.components.map((comp) => (
                    <button
                      key={comp}
                      onClick={() => { scrollTo(comp.toLowerCase()); setMobileNavOpen(false); }}
                      className="block w-full text-left px-2 py-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xs"
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex">
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 bg-zinc-950 text-zinc-300 z-30 border-r border-zinc-800">
          <div className="px-5 pt-6 pb-4 border-b border-zinc-800">
            <p className="text-sm font-semibold text-white tracking-tight">defaultDesignSystem</p>
            <p className="text-xs text-zinc-500 mt-0.5">18 components</p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4 text-sm scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-2 mb-1.5">
                  {cat.label}
                </p>
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
          <div className="px-4 pb-4 pt-3 border-t border-zinc-800 relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="theme-btn flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-full"
            >
              <span className="text-base leading-none">{dark ? '\u2600' : '\uD83C\uDF19'}</span>
              Appearance
            </button>

            {themeOpen && (
              <div id="theme-menu" className="absolute bottom-full left-3 right-3 mb-2 p-3 rounded-lg bg-zinc-900 border border-zinc-700 shadow-xl z-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">Appearance</span>
                  <button
                    onClick={() => { setDark(!dark); setThemeOpen(false); }}
                    className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    {dark ? '☀️ Light' : '🌙 Dark'}
                  </button>
                </div>

                <div className="border-t border-zinc-800 pt-2">
                  <p className="text-[11px] text-zinc-400 mb-2">Accent Color</p>
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    {Object.entries(THEME_PRESETS).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => { applyTheme(t.hex); setPrimaryHex(t.hex); }}
                        className="w-5 h-5 rounded-full border border-zinc-700 ring-offset-1 ring-offset-zinc-900 hover:ring-2 hover:ring-zinc-500 transition-all"
                        style={{ background: t.hex }}
                        title={t.name}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryHex}
                      onChange={(e) => { setPrimaryHex(e.target.value); applyTheme(e.target.value); }}
                      className="w-7 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <span className="text-[10px] text-zinc-500 font-mono">{primaryHex}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 lg:ml-56 min-w-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
                defaultDesignSystem
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                React components styled with Tailwind CSS. Copied to your project via CLI. Full
                ownership, zero vendor lock-in.
              </p>
              <p className="text-xs text-muted-foreground/40 mb-6">
                Design System by{' '}
                <strong className="text-muted-foreground/60 font-medium">
                  <a href="https://www.linkedin.com/in/joao-felipedev/">
                    João Felipe
                  </a>
                </strong>
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="soft" color="primary">
                  React 19
                </Badge>
                <Badge variant="soft" color="primary">
                  Tailwind CSS
                </Badge>
                <Badge variant="soft" color="primary">
                  TypeScript
                </Badge>
                <Badge variant="soft" color="primary">
                  Accessible
                </Badge>
                <Badge variant="soft" color="primary">
                  18 Components
                </Badge>
              </div>
            </div>

            {/* Theme FAB — mobile */}
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="theme-btn lg:hidden fixed bottom-6 right-6 z-30 p-3 rounded-full bg-zinc-900 text-zinc-300 shadow-lg"
              aria-label="Theme settings"
            >
              <span className="text-lg leading-none">{dark ? '\u2600' : '\uD83C\uDF19'}</span>
            </button>

            {themeOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={() => setThemeOpen(false)} />
                <div id="theme-menu" className="relative bg-zinc-900 border border-zinc-700 rounded-lg p-4 w-72 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Appearance</span>
                    <button
                      onClick={() => { setDark(!dark); setThemeOpen(false); }}
                      className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      {dark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                  </div>
                  <div className="border-t border-zinc-800 pt-2">
                    <p className="text-[11px] text-zinc-400 mb-2">Accent Color</p>
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {Object.entries(THEME_PRESETS).map(([key, t]) => (
                        <button
                          key={key}
                          onClick={() => { applyTheme(t.hex); setPrimaryHex(t.hex); }}
                          className="w-5 h-5 rounded-full border border-zinc-700 ring-offset-1 ring-offset-zinc-900 hover:ring-2 hover:ring-zinc-500 transition-all"
                          style={{ background: t.hex }}
                          title={t.name}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryHex}
                        onChange={(e) => { setPrimaryHex(e.target.value); applyTheme(e.target.value); }}
                        className="w-7 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">{primaryHex}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id} className="mb-16">
                {cat.components.map((comp) => {
                  const id = comp.toLowerCase();
                  return (
                    <div key={comp} id={id}>
                      <Section
                        id={`${id}-content`}
                        title={comp}
                        observe={observe}
                        visible={visible.has(`${id}-content`)}
                      >
                        {comp === 'Color Palette' && <ColorPalette colors={dark ? darkColors : lightColors} />}
                        {comp === 'Button' && <ButtonShowcase />}
                        {comp === 'Badge' && <BadgeShowcase />}
                        {comp === 'Input' && <InputShowcase />}
                        {comp === 'Select' && <SelectShowcase />}
                        {comp === 'Checkbox' && (
                          <CheckboxShowcase
                            checked={checkboxChecked}
                            onChange={setCheckboxChecked}
                          />
                        )}
                        {comp === 'RadioGroup' && (
                          <RadioGroupShowcase value={radioValue} onChange={setRadioValue} />
                        )}
                        {comp === 'Switch' && (
                          <SwitchShowcase checked={switchChecked} onChange={setSwitchChecked} />
                        )}
                        {comp === 'Toast' && <ToastShowcase onAdd={addToast} />}
                        {comp === 'Modal' && (
                          <ModalShowcase open={modalOpen} onOpen={setModalOpen} />
                        )}
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
  const [variant, setVariant] = useState<
    'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  >('default');
  const [size, setSize] = useState<'sm' | 'default' | 'lg'>('default');

  return (
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">
        Click the pills above to change variant and size
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-1 flex-wrap">
          {(['default', 'outline', 'secondary', 'ghost', 'link', 'destructive'] as const).map(
            (v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all ${variant === v ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
              >
                {v}
              </button>
            ),
          )}
        </div>
        <div className="flex gap-1 flex-wrap">
          {(['sm', 'default', 'lg'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-2.5 py-1 text-xs rounded-md transition-all ${size === s ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant={variant} size={size}>
          Button
        </Button>
        <Button variant={variant} size={size} disabled>
          Disabled
        </Button>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Button variant="${variant}" size="${size}">Button</Button>`} />
      </div>
    </Card>
  );
}

function BadgeShowcase() {
  return (
    <Card variant="outlined" padding="md">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Solid</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="solid" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Outline</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="outline" color={c}>
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Soft</p>
          <div className="flex flex-wrap gap-2">
            {(['primary', 'success', 'warning', 'danger'] as const).map((c) => (
              <Badge key={c} variant="soft" color={c}>
                {c}
              </Badge>
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
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">
        Click the pills above to change variant
      </p>
      <div className="flex gap-1 flex-wrap mb-4">
        {(['default', 'filled', 'outline', 'ghost'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-2.5 py-1 text-xs rounded-md transition-all ${variant === v ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
          >
            {v}
          </button>
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
    <Card variant="outlined" padding="md">
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

function CheckboxShowcase({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">Click the checkbox to toggle</p>
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
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">Click an option to select it</p>
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
        <CodeBlock
          code={`<RadioGroup name="group" options={[\n  { label: "Option 1", value: "opt1" },\n]} />`}
        />
      </div>
    </Card>
  );
}

function SwitchShowcase({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">Click the switch to toggle</p>
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

function ToastShowcase({
  onAdd,
}: {
  onAdd: (variant: 'success' | 'error' | 'warning' | 'info', msg: string) => void;
}) {
  return (
    <Card variant="outlined" padding="md">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => onAdd('success', 'Operation completed successfully!')}>
          Success
        </Button>
        <Button variant="destructive" onClick={() => onAdd('error', 'Error processing request.')}>
          Error
        </Button>
        <Button variant="secondary" onClick={() => onAdd('warning', 'Resource running low.')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => onAdd('info', 'New version available.')}>
          Info
        </Button>
      </div>
      <div className="mt-3">
        <CodeBlock code={`<Toast variant="success" message="Done!" duration={3000} />`} />
      </div>
    </Card>
  );
}

function ModalShowcase({ open, onOpen }: { open: boolean; onOpen: (v: boolean) => void }) {
  return (
    <Card variant="outlined" padding="md">
      <Button onClick={() => onOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => onOpen(false)}
        title="Modal Title"
        description="Optional description"
        size="md"
      >
        <p className="text-foreground mb-4">
          Modal content goes here. Click outside or press Esc to close.
        </p>
        <Button onClick={() => onOpen(false)}>Close</Button>
      </Modal>
      <div className="mt-3">
        <CodeBlock
          code={`<Modal open={open} onClose={() => setOpen(false)} title="Title">\n  <p>Content</p>\n</Modal>`}
        />
      </div>
    </Card>
  );
}

function SpinnerShowcase() {
  return (
    <Card variant="outlined" padding="md">
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
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">
        Hover over each button to see the tooltip
      </p>
      <div className="flex flex-wrap gap-3">
        <Tooltip content="Tooltip on top" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip on left" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
        <Tooltip content="Disabled tooltip" disabled>
          <Button variant="ghost">Disabled</Button>
        </Tooltip>
      </div>
      <div className="mt-3">
        <CodeBlock
          code={`<Tooltip content="Tooltip text" position="top">\n  <Button>Hover me</Button>\n</Tooltip>`}
        />
      </div>
    </Card>
  );
}

function TabsShowcase() {
  return (
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">Click a tab to switch content</p>
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
    <Card variant="outlined" padding="md">
      <p className="text-xs text-muted-foreground/60 mb-3 italic">Click an item to expand</p>
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
    <Card variant="outlined" padding="md">
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
              <td>
                <Badge color="primary" size="sm">
                  {row.role}
                </Badge>
              </td>
              <td>
                <Badge color={row.status === 'Active' ? 'success' : 'warning'} size="sm">
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <CodeBlock
          code={`<Table variant="simple">\n  <thead>...</thead>\n  <tbody>...</tbody>\n</Table>`}
        />
      </div>
    </Card>
  );
}

function CardShowcase() {
  return (
    <Card variant="outlined" padding="md">
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
    <Card variant="outlined" padding="md">
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
    <Card variant="outlined" padding="md">
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

const CSS_VAR_GROUPS: { label: string; tokens: string[] }[] = [
  {
    label: 'Brand',
    tokens: ['--primary', '--primary-foreground', '--secondary', '--secondary-foreground', '--accent', '--accent-foreground'],
  },
  {
    label: 'Feedback',
    tokens: ['--success', '--success-foreground', '--warning', '--warning-foreground', '--destructive', '--destructive-foreground'],
  },
  {
    label: 'Base',
    tokens: ['--background', '--foreground', '--card', '--card-foreground', '--popover', '--popover-foreground', '--muted', '--muted-foreground'],
  },
  {
    label: 'Surface',
    tokens: ['--surface', '--surface-foreground', '--surface-hover'],
  },
  {
    label: 'Border & Ring',
    tokens: ['--border', '--input', '--ring', '--ring-success', '--ring-warning'],
  },
  {
    label: 'Tooltip',
    tokens: ['--tooltip', '--tooltip-foreground', '--tooltip-light', '--tooltip-light-foreground', '--tooltip-light-border'],
  },
  {
    label: 'Switch',
    tokens: ['--switch-bg', '--switch-thumb'],
  },
  {
    label: 'Shadows',
    tokens: ['--shadow-sm', '--shadow-md', '--shadow-lg'],
  },
  {
    label: 'Radius',
    tokens: ['--radius'],
  },
];

const CSS_LIGHT: Record<string, string> = {
  '--background': '0 0% 100%',
  '--foreground': '222.2 84% 4.9%',
  '--card': '0 0% 100%',
  '--card-foreground': '222.2 84% 4.9%',
  '--popover': '0 0% 100%',
  '--popover-foreground': '222.2 84% 4.9%',
  '--primary': '221.2 83.2% 53.3%',
  '--primary-foreground': '210 40% 98%',
  '--secondary': '210 40% 96.1%',
  '--secondary-foreground': '222.2 47.4% 11.2%',
  '--muted': '210 40% 96.1%',
  '--muted-foreground': '215.4 16.3% 46.9%',
  '--accent': '210 40% 96.1%',
  '--accent-foreground': '222.2 47.4% 11.2%',
  '--destructive': '0 84.2% 60.2%',
  '--destructive-foreground': '210 40% 98%',
  '--success': '142.1 76.2% 36.3%',
  '--success-foreground': '355.7 100% 97.3%',
  '--warning': '38 92% 50%',
  '--warning-foreground': '48 96% 89%',
  '--border': '214.3 31.8% 91.4%',
  '--input': '214.3 31.8% 91.4%',
  '--ring': '221.2 83.2% 53.3%',
  '--radius': '0.5rem',
  '--surface': '0 0% 96.1%',
  '--surface-foreground': '0 0% 45.1%',
  '--surface-hover': '0 0% 90.2%',
  '--tooltip': '0 0% 12.2%',
  '--tooltip-foreground': '0 0% 100%',
  '--tooltip-light': '0 0% 100%',
  '--tooltip-light-foreground': '0 0% 12.2%',
  '--tooltip-light-border': '0 0% 89.8%',
  '--switch-bg': '0 0% 86.7%',
  '--switch-thumb': '0 0% 100%',
  '--ring-success': '142.1 76.2% 36.3%',
  '--ring-warning': '38 92% 50%',
  '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

const CSS_DARK: Record<string, string> = {
  '--background': '222.2 84% 4.9%',
  '--foreground': '210 40% 98%',
  '--card': '222.2 84% 4.9%',
  '--card-foreground': '210 40% 98%',
  '--popover': '222.2 84% 4.9%',
  '--popover-foreground': '210 40% 98%',
  '--primary': '217.2 91.2% 59.8%',
  '--primary-foreground': '222.2 47.4% 11.2%',
  '--secondary': '217.2 32.6% 17.5%',
  '--secondary-foreground': '210 40% 98%',
  '--muted': '217.2 32.6% 17.5%',
  '--muted-foreground': '215 20.2% 65.1%',
  '--accent': '217.2 32.6% 17.5%',
  '--accent-foreground': '210 40% 98%',
  '--destructive': '0 62.8% 30.6%',
  '--destructive-foreground': '210 40% 98%',
  '--success': '142.1 70.6% 45.3%',
  '--success-foreground': '144.9 80.4% 10%',
  '--warning': '48 96% 89%',
  '--warning-foreground': '38 92% 50%',
  '--border': '217.2 32.6% 17.5%',
  '--input': '217.2 32.6% 17.5%',
  '--ring': '224.3 76.3% 48%',
  '--radius': '0.5rem',
  '--surface': '216 28.3% 8.2%',
  '--surface-foreground': '215 20.2% 65.1%',
  '--surface-hover': '217.2 32.6% 13.5%',
  '--tooltip': '0 0% 93%',
  '--tooltip-foreground': '0 0% 12.2%',
  '--tooltip-light': '222.2 84% 4.9%',
  '--tooltip-light-foreground': '210 40% 98%',
  '--tooltip-light-border': '217.2 32.6% 17.5%',
  '--switch-bg': '217.2 32.6% 17.5%',
  '--switch-thumb': '210 40% 98%',
  '--ring-success': '142.1 70.6% 45.3%',
  '--ring-warning': '48 96% 50%',
  '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
  '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
};

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  } else s = 0;
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isLight(hex: string): boolean {
  return (parseInt(hex.slice(1, 3), 16) * 299 + parseInt(hex.slice(3, 5), 16) * 587 + parseInt(hex.slice(5, 7), 16) * 114) / 1000 > 128;
}

const THEME_PRESETS: Record<string, { name: string; hex: string }> = {
  blue: { name: 'Default Blue', hex: '#3b82f6' },
  green: { name: 'Green', hex: '#22c55e' },
  purple: { name: 'Purple', hex: '#a855f7' },
  orange: { name: 'Orange', hex: '#f97316' },
  rose: { name: 'Rose', hex: '#e11d48' },
};

function ColorSwatch({ token, value }: { token: string; value: string }) {
  if (token === '--radius') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 bg-muted border border-border" style={{ borderRadius: value }} />
        <div className="min-w-0">
          <p className="text-xs font-mono text-foreground truncate">{token}</p>
          <p className="text-[11px] text-muted-foreground font-mono truncate">{value}</p>
        </div>
      </div>
    );
  }

  if (token.startsWith('--shadow-')) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 rounded bg-background border border-border" style={{ boxShadow: value }} />
        <div className="min-w-0">
          <p className="text-xs font-mono text-foreground truncate">{token}</p>
          <p className="text-[11px] text-muted-foreground font-mono truncate">{value}</p>
        </div>
      </div>
    );
  }

  const isColor = /^[\d.]+(\s+[\d.]+%){2}$/.test(value);
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-8 h-8 shrink-0 rounded-full border border-border"
        style={{ background: isColor ? `hsl(${value})` : value }}
      />
      <div className="min-w-0">
        <p className="text-xs font-mono text-foreground truncate">{token}</p>
        <p className="text-[11px] text-muted-foreground font-mono truncate">
          {isColor ? `hsl(${value})` : value}
        </p>
      </div>
    </div>
  );
}

function ColorPalette({ colors }: { colors: Record<string, string> }) {
  return (
    <Card variant="outlined" padding="md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CSS_VAR_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {group.label}
            </p>
            <div className="space-y-2">
              {group.tokens.map((token) => (
                <ColorSwatch key={token} token={token} value={colors[token] || ''} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <CodeBlock
          code={'/* All colors are CSS variables in globals.css */\n/* Change HSL values to customize your theme */'}
        />
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
