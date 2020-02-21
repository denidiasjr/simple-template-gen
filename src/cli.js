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

  const currentFolder = configFile;
  // while (currentFolder.files) {
  createFolder(templateArgs.output, currentFolder);
  // }

  console.log(configFile);
}

function createFolder(outputFolder, jsonStructure) {
  const outputPath = path.join(path.resolve(outputFolder), jsonStructure.folder);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  createFiles(outputPath, jsonStructure.files);
}

function createFiles(outputPath, files) {

  files.forEach(file => {

    const templatePath = path.resolve(file.template);
    const template = require(templatePath);
    const outputFile = path.join(outputPath, file.file);

    fs.writeFileSync(outputFile, template());
  });
}

module.exports = cli;