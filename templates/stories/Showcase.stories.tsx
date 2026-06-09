import React, { useState } from 'react';
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </Card>
  );
}

function VariantRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function ShowcasePage() {
  const [dark, setDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; variant: 'success' | 'error' | 'warning' | 'info'; message: string }[]>([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const addToast = (variant: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const accordionItems = [
    { id: 'faq1', title: 'O que é este design system?', content: 'Um conjunto de componentes React estilizados com Tailwind CSS, prontos para serem copiados para o seu projeto via CLI.' },
    { id: 'faq2', title: 'Como personalizar as cores?', content: 'Todas as cores são definidas via CSS variables em globals.css. Basta alterar os valores HSL para criar seu próprio tema.' },
    { id: 'faq3', title: 'Suporta dark mode?', content: 'Sim! Adicione a classe .dark no elemento html e as variáveis escuras serão aplicadas automaticamente.' },
  ];

  const tabs = [
    { id: 'tab1', label: 'Preview', content: <div className="py-4 text-foreground">Conteúdo da aba Preview. Aqui você pode ver o resultado final dos componentes.</div> },
    { id: 'tab2', label: 'Code', content: <div className="py-4 text-foreground">Conteúdo da aba Code. Exemplo de como usar os componentes no seu projeto.</div> },
    { id: 'tab3', label: 'Props', content: <div className="py-4 text-foreground">Conteúdo da aba Props. Documentação das propriedades disponíveis.</div> },
  ];

  const tableData = [
    { name: 'João Silva', email: 'joao@exemplo.com', role: 'Admin', status: 'Ativo' },
    { name: 'Maria Souza', email: 'maria@exemplo.com', role: 'Editor', status: 'Ativo' },
    { name: 'Carlos Lima', email: 'carlos@exemplo.com', role: 'Viewer', status: 'Inativo' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant} message={t.message} duration={3000} onClose={() => removeToast(t.id)} />
      ))}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Design System</h1>
            <p className="text-muted-foreground mt-1">Showcase completo — 17 componentes</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm text-muted-foreground">{dark ? '🌙 Dark' : '☀️ Light'}</span>
            <Switch checked={dark} onChange={() => setDark(!dark)} size="md" color="primary" />
          </label>
        </div>

        <SectionCard title="Buttons">
          <VariantRow label="Variants">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">+</Button>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="States">
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </VariantRow>
        </SectionCard>

        <SectionCard title="Badge">
          <VariantRow label="Variants">
            <Badge variant="solid" color="primary">Primary</Badge>
            <Badge variant="solid" color="success">Success</Badge>
            <Badge variant="solid" color="warning">Warning</Badge>
            <Badge variant="solid" color="danger">Danger</Badge>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Outlined">
            <Badge variant="outline" color="primary">Primary</Badge>
            <Badge variant="outline" color="success">Success</Badge>
            <Badge variant="outline" color="warning">Warning</Badge>
            <Badge variant="outline" color="danger">Danger</Badge>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Soft">
            <Badge variant="soft" color="primary">Primary</Badge>
            <Badge variant="soft" color="success">Success</Badge>
            <Badge variant="soft" color="warning">Warning</Badge>
            <Badge variant="soft" color="danger">Danger</Badge>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Sizes">
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
          </VariantRow>
        </SectionCard>

        <SectionCard title="Formulários">
          <VariantRow label="Input">
            <Input placeholder="Default input" className="max-w-xs" />
            <Input placeholder="Com erro" status="error" className="max-w-xs" />
            <Input placeholder="Sucesso" status="success" className="max-w-xs" />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Input Variants">
            <Input variant="filled" placeholder="Filled" className="max-w-xs" />
            <Input variant="ghost" placeholder="Ghost" className="max-w-xs" />
            <Input leftIcon={<span className="text-muted-foreground">🔍</span>} placeholder="Com ícone" className="max-w-xs" />
            <Input size="sm" placeholder="Small" className="max-w-xs" />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Select">
            <Select className="max-w-xs">
              <option>Default</option>
              <option>Opção A</option>
              <option>Opção B</option>
            </Select>
            <Select status="error" className="max-w-xs">
              <option>Com erro</option>
            </Select>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Checkbox & Switch">
            <div className="flex items-center gap-4">
              <Checkbox checked={checkboxChecked} onChange={() => setCheckboxChecked(!checkboxChecked)} />
              <span className="text-sm text-foreground">{checkboxChecked ? 'Checked' : 'Unchecked'}</span>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox indeterminate />
              <span className="text-sm text-foreground">Indeterminate</span>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox disabled />
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)} />
              <span className="text-sm text-foreground">{switchChecked ? 'On' : 'Off'}</span>
            </div>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Radio Group">
            <RadioGroup
              name="showcase-radio"
              options={[
                { label: 'Opção 1', value: 'option1' },
                { label: 'Opção 2', value: 'option2' },
                { label: 'Opção 3 (disabled)', value: 'option3', disabled: true },
              ]}
              value={radioValue}
              onChange={setRadioValue}
              orientation="horizontal"
            />
          </VariantRow>
        </SectionCard>

        <SectionCard title="Feedback">
          <VariantRow label="Toast">
            <Button onClick={() => addToast('success', 'Operação realizada com sucesso!')}>Success Toast</Button>
            <Button variant="destructive" onClick={() => addToast('error', 'Erro ao processar requisição.')}>Error Toast</Button>
            <Button variant="secondary" onClick={() => addToast('warning', 'Atenção: recurso quase esgotado.')}>Warning Toast</Button>
            <Button variant="outline" onClick={() => addToast('info', 'Nova versão disponível.')}>Info Toast</Button>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Modal">
            <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Título do Modal"
              description="Descrição opcional do modal"
              size="md"
            >
              <p className="text-foreground mb-4">Conteúdo do modal. Clique fora ou no X para fechar.</p>
              <Button onClick={() => setModalOpen(false)}>Fechar</Button>
            </Modal>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Spinner">
            <div className="flex items-center gap-6">
              <Spinner variant="circular" size="sm" />
              <Spinner variant="circular" size="md" />
              <Spinner variant="circular" size="lg" />
              <Spinner variant="dots" size="md" />
              <Spinner variant="bars" size="md" />
              <Spinner color="neutral" />
              <Spinner color="white" className="bg-primary p-2 rounded" />
            </div>
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Tooltip">
            <Tooltip content="Tooltip dark" position="top" variant="dark">
              <Button variant="outline">Hover dark</Button>
            </Tooltip>
            <Tooltip content="Tooltip light" position="bottom" variant="light">
              <Button variant="outline">Hover light</Button>
            </Tooltip>
            <Tooltip content="Tooltip à direita" position="right" delay={0}>
              <Button variant="ghost">Right</Button>
            </Tooltip>
            <Tooltip content="Tooltip desabilitado" disabled>
              <Button variant="ghost">Disabled</Button>
            </Tooltip>
          </VariantRow>
        </SectionCard>

        <SectionCard title="Navegação & Data">
          <VariantRow label="Tabs">
            <Tabs tabs={tabs} variant="line" />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Tabs Variants">
            <Tabs tabs={tabs.map(t => ({ ...t, content: <div className="py-2 text-foreground">{t.content}</div> }))} variant="solid" />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Accordion">
            <Accordion items={accordionItems} variant="default" />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Accordion Variants">
            <Accordion items={accordionItems} variant="bordered" collapsible={false} defaultOpen={['faq1']} />
          </VariantRow>
          <Divider spacing="sm" />
          <VariantRow label="Table">
            <Table variant="simple">
              <thead>
                <tr>
                  <th className="text-left font-medium text-muted-foreground">Nome</th>
                  <th className="text-left font-medium text-muted-foreground">Email</th>
                  <th className="text-left font-medium text-muted-foreground">Função</th>
                  <th className="text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.name}>
                    <td className="text-foreground">{row.name}</td>
                    <td className="text-muted-foreground">{row.email}</td>
                    <td><Badge color="primary" size="sm">{row.role}</Badge></td>
                    <td><Badge color={row.status === 'Ativo' ? 'success' : 'warning'} size="sm">{row.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </VariantRow>
        </SectionCard>

        <SectionCard title="Layout">
          <VariantRow label="Card Variants">
            <Card variant="default" className="max-w-xs">
              <p className="text-foreground font-medium">Default Card</p>
              <p className="text-muted-foreground text-sm mt-1">Com borda e sombra suave.</p>
            </Card>
            <Card variant="outlined" className="max-w-xs">
              <p className="text-foreground font-medium">Outlined Card</p>
              <p className="text-muted-foreground text-sm mt-1">Borda dupla destacada.</p>
            </Card>
            <Card variant="elevated" className="max-w-xs">
              <p className="text-foreground font-medium">Elevated Card</p>
              <p className="text-muted-foreground text-sm mt-1">Sombra elevada, sem borda.</p>
            </Card>
          </VariantRow>
          <Divider spacing="md" />
          <VariantRow label="Avatar">
            <Avatar fallback="JF" size="sm" />
            <Avatar fallback="MS" size="md" />
            <Avatar fallback="CL" size="lg" />
            <Avatar fallback="AD" size="xl" />
            <Avatar fallback="ON" status="online" />
            <Avatar fallback="OF" status="offline" />
            <Avatar fallback="BS" status="busy" />
            <Avatar
              src="https://i.pravatar.cc/150?u=avatar1"
              fallback="U1"
              size="lg"
            />
            <Avatar fallback="SQ" shape="square" />
          </VariantRow>
          <Divider spacing="md" />
          <VariantRow label="Divider">
            <div className="w-full">
              <p className="text-foreground">Texto acima do divider solid</p>
              <Divider variant="solid" spacing="md" />
              <p className="text-foreground">Texto acima do divider dashed</p>
              <Divider variant="dashed" spacing="md" />
              <div className="flex items-center h-12">
                <span className="text-foreground">Esquerda</span>
                <Divider orientation="vertical" spacing="md" />
                <span className="text-foreground">Meio</span>
                <Divider orientation="vertical" variant="dashed" spacing="md" />
                <span className="text-foreground">Direita</span>
              </div>
            </div>
          </VariantRow>
        </SectionCard>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Showcase/All Components',
  component: ShowcasePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Showcase = {
  render: () => <ShowcasePage />,
};
