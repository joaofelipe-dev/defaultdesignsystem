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
      const availableComponents = components
        .filter((c) => c.endsWith('.tsx') && !c.endsWith('.test.tsx'))
        .map((c) => c.replace('.tsx', ''));

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

      // ----------------------------------------------------------------
      // STEP 1: globals.css — só Tailwind directives (@tailwind / @import)
      // Só cria se não existir (Next.js já gera o próprio)
      // ----------------------------------------------------------------
      const stylesDir = isNext ? 'src/app' : 'src/styles';
      const cssSourceName = isTailwindV4 ? 'globals-v4.css' : 'globals.css';
      const cssSource = path.join(TEMPLATES_DIR, 'styles', cssSourceName);
      const cssTarget = path.join(targetStylesDir, 'globals.css');
      if (!(await fs.pathExists(cssTarget))) {
        await fs.copy(cssSource, cssTarget);
        console.log('');
        console.log(kleur.green(`✔ ${stylesDir}/globals.css criado com as diretivas do Tailwind.`));
      } else {
        console.log('');
        console.log(kleur.cyan(`ℹ ${stylesDir}/globals.css ja existe — mantivemos o seu arquivo.`));
      }

      // ----------------------------------------------------------------
      // STEP 2: design-tokens.css — CSS custom properties (:root / .dark)
      // Nome único → nunca conflita, sempre é copiado
      // ----------------------------------------------------------------
      const tokensSourceName = isTailwindV4 ? 'design-tokens-v4.css' : 'design-tokens.css';
      const tokensSource = path.join(TEMPLATES_DIR, 'styles', tokensSourceName);
      const tokensTarget = path.join(targetStylesDir, 'design-tokens.css');
      if (!(await fs.pathExists(tokensTarget))) {
        await fs.copy(tokensSource, tokensTarget);
        console.log(kleur.green(`✔ ${stylesDir}/design-tokens.css criado com as varaveis de cor.`));
      } else {
        console.log(kleur.yellow(`ℹ ${stylesDir}/design-tokens.css ja existe — mantivemos o existente.`));
      }

      // ----------------------------------------------------------------
      // STEP 3: theme-{name}.css — @theme block do tema escolhido (Tailwind v4)
      // Sempre é copiado
      // ----------------------------------------------------------------
      const themeSource = path.join(TEMPLATES_DIR, 'styles/themes', `${theme}.css`);
      const themeFilename = `theme-${theme}.css`;
      const themeTarget = path.join(targetStylesDir, themeFilename);
      await fs.copy(themeSource, themeTarget);
      console.log(kleur.green(`✔ ${stylesDir}/theme-${theme}.css criado com o tema "${theme}".`));

      // ----------------------------------------------------------------
      // STEP 4: tailwind-preset.cjs (Tailwind v3)
      // ----------------------------------------------------------------
      if (!isTailwindV4) {
        const presetSource = path.join(TEMPLATES_DIR, 'tailwind-preset.js');
        const presetTarget = path.join(process.cwd(), 'tailwind-preset.cjs');
        if (!(await fs.pathExists(presetTarget))) {
          await fs.copy(presetSource, presetTarget);
          console.log(kleur.green(`✔ tailwind-preset.cjs adicionado na raiz.`));
        }
      }

      // ----------------------------------------------------------------
      // STEP 5: Instalar dependencias
      // ----------------------------------------------------------------
      console.log('');
      console.log(kleur.cyan('Instalando dependencias (clsx, tailwind-merge)...'));

      try {
        execSync('npm install clsx tailwind-merge', { stdio: 'inherit' });
        console.log(kleur.green(`✔ Dependencias instaladas com sucesso!`));
      } catch {
        console.error(
          kleur.yellow(`Aviso: Nao foi possivel instalar as dependencias automaticamente.`),
        );
        console.log(kleur.cyan(`Por favor, execute manualmente: npm install clsx tailwind-merge`));
      }

      // ----------------------------------------------------------------
      // STEP 6: Auto-import ou instrucoes manuais
      // ----------------------------------------------------------------
      const relativePath = isNext ? '' : 'styles/';
      const entryName = isNext ? 'layout.tsx' : 'main.tsx';
      const entryPath = path.join(process.cwd(), isNext ? 'src/app' : 'src', entryName);
      let autoImport = false;

      if (fs.existsSync(entryPath)) {
        console.log('');
        const answer = await prompts({
          type: 'confirm',
          name: 'value',
          message: `Adicionar os imports automaticamente no ${isNext ? 'src/app' : 'src'}/${entryName}?`,
          initial: true,
        });
        autoImport = answer.value;

        if (autoImport) {
          let content = fs.readFileSync(entryPath, 'utf-8');
          let lines = content.split('\n');

          // Build list of new imports (skip if already exist)
          const toAdd = [];
          const tkPath = `./${relativePath}design-tokens.css`;
          const thPath = `./${relativePath}theme-${theme}.css`;
          const glPath = `./${relativePath}globals.css`;

          if (!content.includes(tkPath)) toAdd.push(`import "${tkPath}"`);
          if (!content.includes(thPath)) toAdd.push(`import "${thPath}"`);
          const hasGlobals = lines.some(l => /^import\s+["'].*globals\.css["']/.test(l.trim()));
          if (!hasGlobals && !content.includes(glPath)) toAdd.push(`import "${glPath}"`);

          if (toAdd.length === 0) {
            console.log(kleur.yellow(`ℹ Os imports ja existem em ${entryName}. Nada a fazer.`));
          } else {
            // Insert before existing globals.css import, or after last import
            let globalsIdx = -1;
            for (let i = 0; i < lines.length; i++) {
              if (/^import\s+["'].*globals\.css["']/.test(lines[i].trim())) {
                globalsIdx = i;
                break;
              }
            }

            if (globalsIdx >= 0) {
              lines.splice(globalsIdx, 0, ...toAdd, '');
            } else {
              let lastImport = -1;
              for (let i = 0; i < lines.length; i++) {
                if (/^import\s+/.test(lines[i].trim())) lastImport = i;
              }
              if (lastImport >= 0) {
                lines.splice(lastImport + 1, 0, '', ...toAdd);
              } else {
                lines.unshift(...toAdd, '');
              }
            }

            fs.writeFileSync(entryPath, lines.join('\n'), 'utf-8');
            console.log(kleur.green(`✔ ${toAdd.length} import(s) adicionado(s) em ${isNext ? 'src/app' : 'src'}/${entryName}:`));
            toAdd.forEach(l => console.log(kleur.white(`   ${l}`)));
          }
        }
      }

      // ----------------------------------------------------------------
      // STEP 7: Instrucoes finais (se nao fez auto-import)
      // ----------------------------------------------------------------
      if (!autoImport) {
        console.log('');
        console.log(kleur.bold().white('═══════════════════════════════════════════════════'));
        console.log(kleur.bold().white('   IMPORTE OS ESTILOS NO SEU PROJETO'));
        console.log(kleur.bold().white('═══════════════════════════════════════════════════'));
        console.log('');

        if (isNext) {
          console.log(kleur.cyan('> Em src/app/layout.tsx, adicione:'));
        } else {
          console.log(kleur.cyan('> Em src/main.tsx, adicione:'));
        }

        console.log('');
        console.log(kleur.white(`   import "./${relativePath}design-tokens.css"`));
        console.log(kleur.white(`   import "./${relativePath}theme-${theme}.css"`));

        if (await fs.pathExists(cssTarget)) {
          console.log(kleur.white(`   import "./${relativePath}globals.css"`));
          console.log('');
          console.log(kleur.dim('   (ordem: design-tokens → theme → globals)'));
        }

        console.log('');
        console.log(kleur.bold().white('═══════════════════════════════════════════════════'));
      }

      if (!isTailwindV4) {
        console.log('');
        console.log(kleur.cyan('> Configure o Tailwind v3 na raiz do projeto:'));
        console.log(kleur.white('   tailwind.config.cjs:'));
        console.log(kleur.white('     const preset = require("./tailwind-preset.cjs");'));
        console.log(kleur.white('     module.exports = { presets: [preset], content: ["./index.html", "./src/**/*.{ts,tsx}"] };'));
        console.log('');
        console.log(kleur.white('   postcss.config.cjs:'));
        console.log(kleur.white('     module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };'));
      } else {
        console.log('');
        console.log(kleur.green('> Tailwind v4 detectado! Nenhuma config extra de PostCSS necessaria.'));
      }
    } catch (err) {
      console.error(kleur.red('Erro na inicializacao:'), err);
    }
  });

program.parse(process.argv);
