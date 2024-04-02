
// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const { generate } = require("rxjs");
// TODO: Create an array of questions for user input
const questions = [
    inquirer
    .prompt([
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
        name: "information",
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
    ])
    
    
];
const readMeContent = generateReadme(answers)
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile("README.md", readMeContent, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

const generateReadme =({ projectTitle, description, installInstruction, information, guidelines, testInstruction}) =>
`# Project Title:  ${projectTitle} 

## Description 
${description}
`

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();

description, installation instructions, usage information, contribution guidelines, and test instructions