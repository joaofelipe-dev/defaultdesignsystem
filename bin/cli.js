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
      const availableComponents = components.map(c => c.replace('.tsx', ''));

      let targetComponent = componentName;

      if (!targetComponent) {
        console.log(kleur.yellow('Por favor, especifique um componente para adicionar.'));
        console.log(kleur.cyan('Exemplo: npx defaultDesignSystem add Button'));
        console.log(kleur.gray('Componentes disponiveis:'));
        availableComponents.forEach(c => console.log(` - ${c}`));
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
        console.log(kleur.green(`✔ Utilitario src/components/utils/cn.ts adicionado (necessario instalar clsx e tailwind-merge).`));
      }

      if (await fs.pathExists(targetFile)) {
        console.warn(kleur.yellow(`O componente ${name} ja existe. Sobrescrevendo...`));
      }

      await fs.copy(sourceFile, targetFile);
      console.log(kleur.green(`✔ Componente ${name} adicionado com sucesso em src/components/ui/${name}.tsx!`));
      console.log(kleur.cyan(`Certifique-se de ter as dependencias "clsx" e "tailwind-merge" instaladas no seu projeto.`));
    } catch (error) {
      console.error(kleur.red('Erro ao adicionar componente:'), error);
    }
  });

program
  .command('init')
  .description('Inicializa a pasta de componentes no projeto')
  .action(async () => {
    try {
      const targetDir = path.join(process.cwd(), 'src/components/ui');
      await fs.ensureDir(targetDir);
      
      const utilsSource = path.join(TEMPLATES_DIR, 'utils/cn.ts');
      const utilsTargetDir = path.join(process.cwd(), 'src/components/utils');
      const utilsTarget = path.join(utilsTargetDir, 'cn.ts');
      
      await fs.ensureDir(utilsTargetDir);
      await fs.copy(utilsSource, utilsTarget);
      
      console.log(kleur.green(`✔ Diretorios e utilitarios (src/utils/cn.ts) criados com sucesso!`));
      console.log(kleur.cyan(`Instalando dependencias necessarias (clsx, tailwind-merge)...`));
      
      try {
        execSync('npm install clsx tailwind-merge', { stdio: 'inherit' });
        console.log(kleur.green(`✔ Dependencias instaladas com sucesso!`));
      } catch (installErr) {
        console.error(kleur.yellow(`Aviso: Nao foi possivel instalar as dependencias automaticamente.`));
        console.log(kleur.cyan(`Por favor, execute manualmente: npm install clsx tailwind-merge`));
      }
    } catch(err) {
      console.error(kleur.red('Erro na inicializacao:'), err);
    }
  });

program.parse(process.argv);
