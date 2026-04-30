#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const program = new Command();

program
  .name("defaultdesignsystem")
  .description("CLI para adicionar componentes ao seu projeto")
  .version("0.0.1");

program
  .command("add <component>")
  .description("Adicionar um componente ao seu projeto")
  .action((component) => {
    const templatePath = path.join(__dirname, "templates", component);
    const targetPath = path.join(process.cwd(), "src/components/ui", component);

    if (!fs.existsSync(templatePath)) {
      console.log(chalk.red("Componente não encontrado"));
      return;
    }

    fs.copySync(templatePath, targetPath);

    console.log(chalk.green(`Componente ${component} criado com sucesso!`));
  });

program.parse();