const HELP_MESSAGE =
  `
Just a simple CLI to generate you code template in a easy way.
Usage: simple-template-gen --config CONFIG_FILE.json --output OUTPUT_FOLDER
Arguments:
  --config                       set the JSON file with the config to generate the templates
  --variables                    set the JSON file that will contain the variables 
  --output                       set the output folder of generated templates
  --help                         display this help and exit
If you want to contribute with this project, fork it on GitHub :)
Repository: https://github.com/denidiasjr/simple-template-gen
`

const NO_CONFIG_ARG = "ERROR: Missing --config parameter with .json file."

export {
  HELP_MESSAGE,
  NO_CONFIG_ARG
}