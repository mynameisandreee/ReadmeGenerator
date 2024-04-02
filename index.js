// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const { generate } = require("rxjs");
// TODO: Create an array of questions for user input

  inquirer.prompt([
    {
      type: "input",
      message: "What is your Project title?",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Type your project description",
      name: "description",
    },
    {
      type: "input",
      message: "What are the steps for installing your project?",
      name: "installInstruction",
    },
    {
      type: "input",
      message: "Type the usage information",
      name: "usage",
    },
    {
      type: "input",
      message: "Type the contribution guidelines",
      name: "guidlines",
    },
    {
      type: "input",
      message: "Type the test instructions",
      name: "testInstuction",
    },
    {
      type: "input",
      message: "Type the License",
      name: "licenseText",
    }
    
])
.then((answers) => {
  const readMeContent = generateReadme(answers);
  // TODO: Create a function to write READ

  fs.writeFile("README.md", readMeContent, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

const generateReadme = ({
  projectTitle,
  description,
  installInstruction,
  usage,
  guidelines,
  testInstruction,
  licenseText
}) =>
  `# Project Title:  ${projectTitle} 

## Description 
${description}

## Table of content
### Installation Instructions
### Usage 
### Contribution 
### Test instruction
### license 



## Installation instructions
${installInstruction}

## Usage information
${usage}

## Contribution Guidlines 
${guidelines}

## Test Instruction 
${testInstruction}

## License
${licenseText}

`;

// // TODO: Create a function to initialize app

// // Function call to initialize app

