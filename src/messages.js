const HELP_MESSAGE =
  `
Just a simple CLI to generate you code template in a easy way.
Usage: simple-template-gen --config CONFIG_FILE.json --output OUTPUT_FOLDER
Arguments:
  --config                       set the config file to templates that will be created
  --output                       set the output folder of generated templates
  --help                         display this help and exit
If you want to contribute with this project, fork it on GitHub :)
Repository: https://github.com/denidiasjr/simple-template-gen
`

const NO_CONFIG_ARG = "ERROR: Missing --config parameter with .json file."

module.exports = {
  HELP_MESSAGE,
  NO_CONFIG_ARG
}