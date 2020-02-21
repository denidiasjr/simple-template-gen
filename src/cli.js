const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

function cli(args) {

  // Read template arguments
  const templateArgs = minimist(args.slice(2));

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
  const outputPath = path.resolve(templateArgs.output);
  jsonStructure.forEach(structure => createStructure(outputPath, structure))
}

function createStructure(outputPath, jsonStructure) {

  if (jsonStructure.folder) {
    const newFolderPath = path.join(outputPath, jsonStructure.folder);
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

      const outputFile = path.join(outputPath, file.file);
      fs.writeFileSync(outputFile, fileContent);
    }
  });
}

module.exports = cli;