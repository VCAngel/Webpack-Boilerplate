#!/usr/bin/env node
const { program } = require('../commander');
const { runCommand } = require('./run');
const helpMsg = `Usage: npx create-webpack-app [--help, --mern, --mevn] <project name>
    
Options:
    --help, -h  Displays command usage information

    --mern      Creates a webpack based MERN application

    --mevn      Creates a webpack bases MEVN application

    ?More stacks soon
`

let projectName = null;

program.argument('<name>', 'Project name')
    .option('-h, --help', 'Displays command usage information')
    .option('--mern', 'Creates a webpack based MERN application')
    .option('--mevn', 'Creates a webpack based MEVN application')
    .action((name) => {
        projectName = name;
    })

program.parse(process.argv)

const options = program.opts();
const optionsLength = Object.entries(options).length;
const argsLength = program.args.length
if (options.help ||
    options.h ||
    (optionsLength == 0 || optionsLength > 1) ||
    argsLength > 1) {
    console.log(helpMsg)
}

if (options.mern) {
    const gitCheckoutCommand = `git clone https://github.com/VCAngel/MERN-app.git ${projectName}`;
    const npmInstall = `cd ${projectName} && npm install -D`;

    console.log(`=> Cloning repository with name ${projectName}`);
    const checkedOut = runCommand(gitCheckoutCommand)
    if (!checkedOut) process.exit(-1);

    console.log(`=> Installing dependencies for ${projectName}...`);
    const installedDeps = runCommand(npmInstall);
    if (!installedDeps) process.exit(-1);

    console.warn('=> All done! Time to code!')
    console.warn(`To start development server: cd ${projectName} && npm start`)
}