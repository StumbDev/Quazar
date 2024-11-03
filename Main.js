#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { Parser } from './src/quazarscript/parser.js';
import { Compiler } from './src/quazarscript/compiler.js';
import fs from 'fs/promises';
import path from 'path';

program
  .version('1.0.0')
  .description('Quazar - A powerful CLI tool');

// Command: create
program
  .command('create <name>')
  .description('Create a new project')
  .option('-t, --type <type>', 'project type (react, vue, node)')
  .action(async (name, options) => {
    console.log(chalk.blue(`Creating new project: ${name}`));
    
    if (!options.type) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'projectType',
          message: 'What type of project would you like to create?',
          choices: ['react', 'vue', 'node']
        }
      ]);
      options.type = answers.projectType;
    }

    console.log(chalk.green(`Creating ${options.type} project named ${name}...`));
    // Add project creation logic here
  });

// Command: info
program
  .command('info')
  .description('Display system information')
  .action(() => {
    console.log(chalk.cyan('System Information:'));
    console.log(chalk.yellow('Node Version:'), process.version);
    console.log(chalk.yellow('Platform:'), process.platform);
    console.log(chalk.yellow('Architecture:'), process.arch);
  });

// Add QuazarScript command
program
  .command('compile <file>')
  .description('Compile QuazarScript file to React components')
  .option('-o, --output <dir>', 'output directory', './dist')
  .action(async (file, options) => {
    try {
      const source = await fs.readFile(file, 'utf-8');
      const parser = new Parser(source);
      const ast = parser.parse();
      const compiler = new Compiler();
      const compiled = compiler.compile(ast);

      const outputPath = path.join(options.output, 
        path.basename(file, '.qz') + '.jsx');
      
      await fs.mkdir(options.output, { recursive: true });
      await fs.writeFile(outputPath, compiled);

      console.log(chalk.green(`Successfully compiled ${file} to ${outputPath}`));
    } catch (error) {
      console.error(chalk.red('Compilation error:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
