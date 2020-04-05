import fs from 'fs';
import path from 'path';
import {
  HELP_MESSAGE,
  NO_CONFIG_ARG
} from './messages'

class CLI {

  constructor(options) {

    if (!options) {
      return;
    }

    this.instance = options;
    this._init();
  }

  _init() {
    this._checkHelp();
    this.instance.variables = this._initVariables();
    this.instance.config = this._initConfig();
    this.instance.output = this._initOutput();
  }

  _checkHelp() {

    // Show help message
    if (this.instance.help) {
      console.log(HELP_MESSAGE);
      process.exit();
    }
  }

  _initVariables() {

    if (!this.instance.variables) {
      return this.instance;
    }

    try {
      return JSON.parse(fs.readFileSync(this.instance.variables));
    } catch (err) {
      console.log(`WARNING: ${err.message}`);
      return this.instance;
    }
  }

  _initConfig() {

    // If there is no --config argument, show error
    if (!this.instance.config) {
      console.log(NO_CONFIG_ARG);
      process.exit();
    }

    const configPath = path.resolve(this.instance.config);

    let configFile;
    try {
      configFile = JSON.parse(fs.readFileSync(configPath));
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      process.exit();
    }

    // Read and create structure
    return Array.isArray(configFile) ? configFile : [configFile];
  }

  _initOutput() {
    return path.resolve(this.instance.output || '.');
  }

  set options(options) {
    this.instance = options || {};
    this._init();
  }

  get variables() {
    return this.instance.variables;
  }

  get help() {
    return this.instance.help;
  }

  get config() {
    return this.instance.config;
  }

  get output() {
    return this.instance.output;
  }
}

export default CLI;