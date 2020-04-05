import fs from 'fs';
import path from 'path';

export const convertName = (name, variables) => {
  return Object.entries(variables).reduce((accum, [key, value]) => accum.replace(`--${key}`, value), name);
}

export const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

export const getTemplate = (templateFolder, variables) => {

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