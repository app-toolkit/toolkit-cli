#! /usr/bin/env node
import { Command } from "commander";
import { createRequire } from "module";
import create from "../src/create.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const program = new Command();

program
  .name("toolkit-cli")
  .description("CLI to create toolkit plugin project.")
  .usage(`<command> [option]`)
  .version(`${pkg.version}`);

// program.option("-c, --create", "create toolkit plugin project");

program
  .command("create <name>")
  .description("create toolkit plugin project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, options) => {
    create(name, options);
  });

program.addHelpText(
  "beforeAll",
  `
████████╗ ██████╗  ██████╗ ██╗     ██╗  ██╗██╗████████╗    ██████╗██╗     ██╗
╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██║ ██╔╝██║╚══██╔══╝   ██╔════╝██║     ██║
   ██║   ██║   ██║██║   ██║██║     █████╔╝ ██║   ██║█████╗██║     ██║     ██║
   ██║   ██║   ██║██║   ██║██║     ██╔═██╗ ██║   ██║╚════╝██║     ██║     ██║
   ██║   ╚██████╔╝╚██████╔╝███████╗██║  ██╗██║   ██║      ╚██████╗███████╗██║
    `
);

program.parse(process.argv);
