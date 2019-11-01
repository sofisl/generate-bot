const GenerateBot = require("./");
const { prompt } = require("enquirer");

async function programName() {
  return await prompt([
    {
      type: "input",
      name: "programName",
      message: "What is the name of the program?"
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of the program?"
    }
  ]);
}

async function main() {
  GenerateBot(await programName());
}
main();
