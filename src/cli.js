const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const {
  HELP_MESSAGE,
  NO_CONFIG_ARG
} = require('./messages')
let variables;

function cli(args) {

  // Read template arguments
  const cliArgs = minimist(args.slice(2));
  variables = cliArgs;

  // Show help message
  if (cliArgs.help) {
    return console.log(HELP_MESSAGE);
  }

  // If there is no --config argument, show error
  if (!cliArgs.config) {
    return console.log(NO_CONFIG_ARG)
  }

  // Read JSON file   
  const configPath = path.resolve(cliArgs.config);

  let configFile;
  try {
    configFile = JSON.parse(fs.readFileSync(configPath));
  } catch (err) {
    return console.log(`ERROR: ${err.message}`);
  }

  // Read and create structure
  const jsonStructure = Array.isArray(configFile) ? configFile : [configFile];
  const outputPath = path.resolve(cliArgs.output || '.');
  jsonStructure.forEach(structure => createStructure(outputPath, structure))
}

function convertName(name, variables) {
  return Object.entries(variables).reduce((accum, [key, value]) => accum.replace(`--${key}`, value), name);
}

function createStructure(outputPath, jsonStructure) {

  if (jsonStructure.folder) {

    const folderName = convertName(jsonStructure.folder, variables);
    const newFolderPath = path.join(outputPath, folderName);
    if (!fs.existsSync(newFolderPath)) {
      fs.mkdirSync(newFolderPath);
    }

    if (jsonStructure.files) {
      createFiles(newFolderPath, jsonStructure.files);
    }
  }

  if (jsonStructure.file) {
    createFiles(outputPath, [jsonStructure]);
  }
}

function createFiles(outputPath, files) {

  if (!Array.isArray(files)) {
    return;
  }

  files.forEach(file => {

    if (file.folder) {
      createStructure(outputPath, file);
    }

    if (file.file) {

      const fileContent = getTemplate(file.template);

      const fileName = convertName(file.file, variables);
      const outputFile = path.join(outputPath, fileName);
      fs.writeFileSync(outputFile, fileContent);
    }
  });
}

function getTemplate(templateFolder) {

  if (!templateFolder) {
    return '';
  }

  const templatePath = path.resolve(templateFolder);
  let template;

  try {
    template = require(templatePath);

    if (typeof template === 'function') {
      template = template(variables);
    }

  } catch (err) {
    template = fs.readFileSync(templatePath);
  }

  return template;
}

module.exports = cli;