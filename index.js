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
      name: "guidelines",
    },
    {
      type: "input",
      message: "Type the test instructions",
      name: "testInstuction",
    },
    {
      type: "list",
      message: "pick your License",
      name: "licenseText",
      choices:[ "[MIT License](./license/MIT)" , "[GNU GPLv3](./license/GNUGPLv3)" ,"[APACHE](./license/APACHE)"

      ]
    }
    
])


.then((answers) => {
    var file = JSON.stringify(answers, null, "  ");

    fs.writeFile("log.txt", `${file}\n`, (err) =>
      err ? console.error(err) : console.log("File Written!")
    );
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
- [Installation Instruction](#installInstruction)
- [Usage](#usage)
- [Contribution Guidelines](#guidelines)
- [Test instructio](#testInstruction)
- [license](#licenseText)



## Installation instructions
\`\`\`bash
${installInstruction}
\`\`\`
## Usage information
\`\`\`javascript
${usage}
\`\`\`
## Contribution Guidlines 
${guidelines}

## Test Instruction 
${testInstruction}

## License
${licenseText}

`;

