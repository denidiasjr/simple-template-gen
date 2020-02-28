const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
let variables;

function cli(args) {

  // Read template arguments
  const templateArgs = minimist(args.slice(2));
  variables = templateArgs;

  // Read JSON file   
  const configPath = path.resolve(templateArgs.config);

  let configFile;
  try {
    configFile = JSON.parse(fs.readFileSync(configPath));
  } catch (err) {
    return console.log(err.message);
  }

  // Read and create structure
  const jsonStructure = Array.isArray(configFile) ? configFile : [configFile];
  const outputPath = path.resolve(templateArgs.output || '.');
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

      let fileContent = '';

      if (file.template) {
        const templatePath = path.resolve(file.template);
        const template = require(templatePath);
        fileContent = template();
      }

      const fileName = convertName(file.file, variables);
      const outputFile = path.join(outputPath, fileName);
      fs.writeFileSync(outputFile, fileContent);
    }
  });
}

module.exports = cli;