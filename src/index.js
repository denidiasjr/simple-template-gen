import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import CLI from './cli';
import {
  convertName,
  createFolder,
  getTemplate,
} from './utils';

const cli = new CLI();

function main(args) {

  // Read template arguments
  cli.options = minimist(args.slice(2));

  // Read and create structure
  cli.config.forEach(structure => createStructure(cli.output, structure))
}

function createStructure(outputPath, jsonStructure) {

  if (jsonStructure.folder) {

    const folderName = convertName(jsonStructure.folder, cli.variables);
    const newFolderPath = path.join(outputPath, folderName);
    createFolder(newFolderPath);

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

      const fileContent = getTemplate(file.template, cli.variables);

      const fileName = convertName(file.file, cli.variables);
      const outputFile = path.join(outputPath, fileName);
      fs.writeFileSync(outputFile, fileContent);
    }
  });
}

export default main;