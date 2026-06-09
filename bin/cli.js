#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const kleur = require('kleur');
const { execSync } = require('child_process');

const program = new Command();

program
  .name('defaultDesignSystem')
  .description('CLI para adicionar componentes de UI prontos no seu projeto')
  .version('1.0.0');

const TEMPLATES_DIR = path.join(__dirname, '../templates');

program
  .command('add [componentName]')
  .description('Adiciona um componente ao seu projeto')
  .action(async (componentName) => {
    try {
      const componentsDir = path.join(TEMPLATES_DIR, 'ui');
      const components = await fs.readdir(componentsDir);
      const availableComponents = components.map((c) => c.replace('.tsx', ''));

      let targetComponent = componentName;

      if (!targetComponent) {
        console.log(kleur.yellow('Por favor, especifique um componente para adicionar.'));
        console.log(kleur.cyan('Exemplo: npx defaultdesignsystem add Button'));
        console.log(kleur.gray('Componentes disponiveis:'));
        availableComponents.forEach((c) => console.log(` - ${c}`));
        process.exit(1);
      }

      // Handle 'all' case
      if (targetComponent.toLowerCase() === 'all') {
        const targetDir = path.join(process.cwd(), 'src/components/ui');

        // Ensure utils/cn.ts exists first
        const utilsSource = path.join(TEMPLATES_DIR, 'utils/cn.ts');
        const utilsTargetDir = path.join(process.cwd(), 'src/components/utils');
        const utilsTarget = path.join(utilsTargetDir, 'cn.ts');

        await fs.ensureDir(targetDir);
        await fs.ensureDir(utilsTargetDir);

        if (!(await fs.pathExists(utilsTarget))) {
          await fs.copy(utilsSource, utilsTarget);
          console.log(kleur.green(`✔ Utilitario src/components/utils/cn.ts adicionado.`));
        }

        console.log(kleur.cyan(`Instalando todos os ${availableComponents.length} componentes...`));

        for (const comp of availableComponents) {
          const srcFile = path.join(componentsDir, `${comp}.tsx`);
          const tgtFile = path.join(targetDir, `${comp}.tsx`);
          await fs.copy(srcFile, tgtFile);
          console.log(kleur.gray(` - ${comp} copiado.`));
        }

        console.log(kleur.green(`✔ Todos os componentes adicionados com sucesso!`));
        return;
      }

      const name = targetComponent.charAt(0).toUpperCase() + targetComponent.slice(1);

      if (!availableComponents.includes(name)) {
        console.error(kleur.red(`Componente "${name}" nao encontrado.`));
        process.exit(1);
      }

      const sourceFile = path.join(componentsDir, `${name}.tsx`);
      const targetDir = path.join(process.cwd(), 'src/components/ui');
      const targetFile = path.join(targetDir, `${name}.tsx`);

      // Ensure utils/cn.ts exists
      const utilsSource = path.join(TEMPLATES_DIR, 'utils/cn.ts');
      const utilsTargetDir = path.join(process.cwd(), 'src/components/utils');
      const utilsTarget = path.join(utilsTargetDir, 'cn.ts');

      await fs.ensureDir(targetDir);
      await fs.ensureDir(utilsTargetDir);

      if (!(await fs.pathExists(utilsTarget))) {
        await fs.copy(utilsSource, utilsTarget);
        console.log(
          kleur.green(
            `✔ Utilitario src/components/utils/cn.ts adicionado (necessario instalar clsx e tailwind-merge).`,
          ),
        );
      }

      if (await fs.pathExists(targetFile)) {
        console.warn(kleur.yellow(`O componente ${name} ja existe. Sobrescrevendo...`));
      }

      await fs.copy(sourceFile, targetFile);
      console.log(
        kleur.green(
          `✔ Componente ${name} adicionado com sucesso em src/components/ui/${name}.tsx!`,
        ),
      );
      console.log(
        kleur.cyan(
          `Certifique-se de ter as dependencias "clsx" e "tailwind-merge" instaladas no seu projeto.`,
        ),
      );
    } catch (error) {
      console.error(kleur.red('Erro ao adicionar componente:'), error);
    }
  });

program
  .command('init')
  .description('Inicializa a pasta de componentes no projeto')
  .option('-t, --theme <name>', 'Tema a ser utilizado (default, green, violet, orange, neutral)')
  .action(async (options) => {
    try {
      const prompts = require('prompts');

      let theme = options.theme;

      if (!theme) {
        const response = await prompts({
          type: 'select',
          name: 'theme',
          message: 'Escolha um tema para o seu projeto:',
          choices: [
            { title: 'Default (Azul)', value: 'default' },
            { title: 'Green (Verde)', value: 'green' },
            { title: 'Violet (Roxo)', value: 'violet' },
            { title: 'Orange (Laranja)', value: 'orange' },
            { title: 'Neutral (Cinza)', value: 'neutral' },
          ],
        });
        theme = response.theme;
      }

      const validThemes = ['default', 'green', 'violet', 'orange', 'neutral'];
      if (!validThemes.includes(theme)) {
        console.error(kleur.red(`Tema "${theme}" invalido. Use: ${validThemes.join(', ')}`));
        process.exit(1);
      }

      const targetComponentsDir = path.join(process.cwd(), 'src/components/ui');
      const targetUtilsDir = path.join(process.cwd(), 'src/components/utils');

      // Detect framework and Tailwind version
      const isNext = ['next.config.js', 'next.config.ts', 'next.config.mjs', 'next.config.cjs']
        .some((f) => fs.existsSync(path.join(process.cwd(), f)));

      const pkgPath = path.join(process.cwd(), 'package.json');
      let isTailwindV4 = false;
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        isTailwindV4 = deps['@tailwindcss/postcss'] !== undefined;
      }

      const targetStylesDir = isNext
        ? path.join(process.cwd(), 'src/app')
        : path.join(process.cwd(), 'src/styles');

      await fs.ensureDir(targetComponentsDir);
      await fs.ensureDir(targetUtilsDir);
      await fs.ensureDir(targetStylesDir);

      // Copy cn.ts utility
      const utilsSource = path.join(TEMPLATES_DIR, 'utils/cn.ts');
      const utilsTarget = path.join(targetUtilsDir, 'cn.ts');
      if (!(await fs.pathExists(utilsTarget))) {
        await fs.copy(utilsSource, utilsTarget);
        console.log(kleur.green(`✔ Utilitario src/components/utils/cn.ts adicionado.`));
      }

      // Copy globals.css (v3 or v4)
      const cssSourceName = isTailwindV4 ? 'globals-v4.css' : 'globals.css';
      const cssSource = path.join(TEMPLATES_DIR, 'styles', cssSourceName);
      const cssTarget = path.join(targetStylesDir, 'globals.css');
      if (!(await fs.pathExists(cssTarget))) {
        await fs.copy(cssSource, cssTarget);
        console.log(kleur.green(`✔ Tema base ${isNext ? 'src/app' : 'src/styles'}/globals.css adicionado.`));
      }

      // Copy theme preset
      const themeSource = path.join(TEMPLATES_DIR, 'styles/themes', `${theme}.css`);
      const themeFilename = isNext ? `theme-${theme}.css` : `theme-${theme}.css`;
      const themeTarget = path.join(targetStylesDir, themeFilename);
      await fs.copy(themeSource, themeTarget);
      console.log(kleur.green(`✔ Tema "${theme}" adicionado em ${isNext ? 'src/app' : 'src/styles'}/theme-${theme}.css.`));

      // Copy tailwind-preset.cjs (v3 only)
      if (!isTailwindV4) {
        const presetSource = path.join(TEMPLATES_DIR, 'tailwind-preset.js');
        const presetTarget = path.join(process.cwd(), 'tailwind-preset.cjs');
        if (!(await fs.pathExists(presetTarget))) {
          await fs.copy(presetSource, presetTarget);
          console.log(kleur.green(`✔ Preset Tailwind tailwind-preset.cjs adicionado.`));
        }
      }

      console.log(kleur.green(`✔ Diretorios e utilitarios criados com sucesso!`));
      console.log(kleur.cyan(`Instalando dependencias necessarias (clsx, tailwind-merge)...`));

      try {
        execSync('npm install clsx tailwind-merge', { stdio: 'inherit' });
        console.log(kleur.green(`✔ Dependencias instaladas com sucesso!`));
      } catch {
        console.error(
          kleur.yellow(`Aviso: Nao foi possivel instalar as dependencias automaticamente.`),
        );
        console.log(kleur.cyan(`Por favor, execute manualmente: npm install clsx tailwind-merge`));
      }

      // Print import instructions
      console.log('');
      const relativePath = isNext ? '' : 'styles/';
      if (isNext) {
        console.log(kleur.cyan('📘 Importe os estilos em src/app/layout.tsx:'));
      } else {
        console.log(kleur.cyan('📘 Importe os estilos em src/main.tsx:'));
      }
      console.log(kleur.white(`   import "./${relativePath}globals.css"`));
      console.log(kleur.white(`   import "./${relativePath}theme-${theme}.css"`));

      if (!isTailwindV4) {
        console.log('');
        console.log(kleur.cyan('📘 Crie tailwind.config.cjs na raiz:'));
        console.log(kleur.white('   const preset = require("./tailwind-preset.cjs");'));
        console.log(kleur.white('   module.exports = { presets: [preset], content: ["./index.html", "./src/**/*.{ts,tsx}"] };'));
        console.log('');
        console.log(kleur.cyan('📘 Crie postcss.config.cjs na raiz:'));
        console.log(kleur.white('   module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };'));
      } else {
        console.log('');
        console.log(kleur.green('✅ Tailwind v4 detectado! Nenhuma config extra necessária.'));
      }
    } catch (err) {
      console.error(kleur.red('Erro na inicializacao:'), err);
    }
  });

program.parse(process.argv);
