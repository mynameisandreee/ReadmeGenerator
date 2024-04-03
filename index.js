// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
// TODO: Create an array of questions for user input

  const questions = [
    {
      type: "input",
      message: "What is your github username?",
      name: "username"
    },
    {
      type: "email",
      message: "What is your email?",
      name: "email"
    },
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
      type: "checkbox",
      message: "What are the contents?",
      name: "table",
      choices: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions']
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
      name: "testInstruction",
    },
    {
      type: "list",
      message: "pick your License",
      name: "licenseText",
      choices:[ "MIT" , "GNU" ,"APACHE"

      ]
    }
    
]
function generateReadme(data) {
  let githubCont = data.guidelines.split(',');
  let githubusername = [];
  githubCont.forEach(username => githubusername.push(username.trim()));
  let githubusernameStr = '';
  githubusername.forEach(username => {
      githubusernameStr += `[${username}](https://github.com/${username}) \n`;
  });

  let content = '';
  data.table.forEach(stuff => {
      content += `* [${stuff}](#${stuff.toLowerCase()}) \n \n`;
  });

  let license = data.licenseText === 'MIT' ? "![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)" : 
               data.licenseText === 'GNU' ? "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)" : 
               "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";

  return `
# Project Title: ${data.projectTitle}

${license}
## Description
${data.description}

## Table of Contents
${content}

## Installation Instructions
\`\`\`bash
${data.installInstruction}
\`\`\`

## Usage
\`\`\`javascript
${data.usage}
\`\`\`

## Contribution Guidelines 
${githubusernameStr}

## Test Instructions 
${data.testInstruction}

## License
${data.licenseText}

## Questions
​
<img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact [${data.login}](${data.html_url}) directly at ${data.email}.

## Screenshot

![](assets/readmeGeneratorSC.png)

## Video link
https://drive.google.com/file/d/1YGlbmimI2z3YwwlYFaQi9fwKA0WtUto3/view?usp=drive_link


`
}

function init() {
  inquirer
      .prompt(questions)
      .then(response => {
          console.log(response);
          var file = JSON.stringify(response, null, "  ");
          
          fs.writeFile("log.txt", `${file}\n`, (err) => {
              if (err) console.error(err);
              else console.log("File Written!");
          });

          axios.get(`https://api.github.com/users/${response.username}`)
              .then(githubResponse => {
                  const userData = {
                      login: githubResponse.data.login,
                      avatar_url: githubResponse.data.avatar_url,
                      html_url: githubResponse.data.html_url,
                      blog: githubResponse.data.blog
                  };
                  
                  const readmeContent = generateReadme({...response, ...userData});

                  fs.writeFile("README.md", readmeContent, (err) => {
                      if (err) throw err;
                      console.log("The README file has been saved!");
                  });
              })
              .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
}

init();