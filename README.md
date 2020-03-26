simple-template-gen
================================================

🖥 Just a simple CLI to generate you code template in a easy way.

![npm](https://img.shields.io/npm/v/simple-template-gen)

## Table of contents

  - [Getting Started](#getting-started)
  - [Creating config file](#creating-config-file)
  - [Inserting variables](#inserting-variables)
  - [Using variables on config file](#using-variables-on-config-file)


## Getting Started

To install `simple-template-gen` command you should use the following command on NPM:

```
npm install -g simple-template-gen
```

If you need, you can install it on your project to use in some script, just removing the `-g` flag.

After installing the command, you can start using it just checking it's arguments using `--help` flag as following:

```
simple-template-gen --help
```

This is an example of use:
```
simple-template-gen --config config.json --output path/to/folder
```

## Creating config file

The config file is a JSON where the user define how the files will be exported and set the template for them. You can have more examples on `examples/config` folder. 

This is an example of it:

```json
{
  "folder": "MyComponent",
  "files": [
    {
      "file": "MyComponent.js",
      "template": "./folder/to/MyComponentTemplate.txt"
    },
    {
      "file": "MyComponent.md",
    },
    {
      "folder": "Documents",
      "files": [
        {
          "file": "Document1.txt"
        },
        {
          "file": "Document2.txt"
        }
      ]
    }
  ]
}
```

This config file will generate the following folder structure:

```
MyComponent/
├── MyComponent.js (filled by template)
├── MyComponent.md
├── Documents/
│   ├── Document1.txt
│   └── Document2.txt
```

You can create a config file as a array to generate any folders you want on output path

```json
[
  {
    "folder": "FolderA",
    "files": [
      {
        "file": "File1.txt"
      },
      {
        "file": "File2.txt"
      },
    ]
  },
  {
    "folder": "FolderB",
    "files": [
      {
        "file": "File3.txt"
      },
    ]
  },
  {
    "folder": "FolderC"
  }
]
```

This config file will generate the following folder structure:

```
FolderA/
├── File1.txt
├── File2.txt
FolderB/
├── File3.txt
FolderC/
```

## Inserting variables

In this section will be described how to insert variables into exported files and config file. To set the variables that you want to apply on files, you can pass them in two ways:

The first way, you can set the variable through command line, using the `--` prefix before each one, as any other argument:

```
simple-template-gen --config config.json --name MyComponent --type Sometype 
```

The other way is to create a JSON file and describe the variables on it, as you can see below:

```json
// variables.json

{ 
  "name": "MyComponent",
  "type": "Sometype"
}
```
```
simple-template-gen --config config.json --variables variables.json
```

## Using variables on config file

After inserting the variables as arguments of our command, you can use them to generate your files and inside your templates.

In the example below, you can see how it can be used on the config file, using the variables set on the last section:

```json
// config.json


{
  "folder": "--name",
  "files": [
    {
      "file": "--name.js",
      "template": "./folder/to/MyComponentTemplate.txt"
    },
    {
      "file": "--name.md",
    },
  ]
}
``` 

This config file will generate the following folder structure:

```
MyComponent/
├── MyComponent.js (filled by template)
├── MyComponent.md
├── Documents/
│   ├── Document1.txt
│   └── Document2.txt
```

So as described on the example, to use your variables on config file you need to set a `--` prefix to indicate that it is a variable set as command argument. In this case, we set `name` and `type` variables, that could be used on config file using `--name` and `--type`.

