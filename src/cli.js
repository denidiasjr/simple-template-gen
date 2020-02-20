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

  console.log(configFile);
}

module.exports = cli;