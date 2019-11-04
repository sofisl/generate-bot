const { prompt } = require('enquirer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')
//const exports = module.exports = {};

exports.collectUserInput = async function() {
     return  await prompt([
	{
       type: 'input',
       name: 'programName', 
       message: 'What is the name of the program?'
	},
        {
      type: 'input', 
      name: 'description', 
      message: 'What is the description of the program?'
       },
	{
	type: 'input',
	name: 'fileLocation', 
	message: 'What path do you want to save this in (relative to /generate-bot)?'
	}
    ]); 
}



exports.creatingBotFiles = async function(dirname, data) {
	data = await data;
	fs.mkdirSync(`${data.fileLocation}`);
	console.log(`${data.fileLocation}`+ " generated");

	let mkDir = `${data.fileLocation}`

	let readAllFiles = function(dirNameRead, dirNameWrite) {
		let files = fs.readdirSync(dirNameRead);
		files.forEach(function(file) {
		let readName = path.join(dirNameRead, file);
		let writeName = path.join(dirNameWrite, file);
			if (fs.statSync(readName).isDirectory()) {
				fs.mkdirSync(writeName);
				console.log(writeName+" generated");
				readAllFiles(readName, writeName);
			}
			else {
				let fileContents = fs.readFileSync(readName);
				let template = Handlebars.compile(fileContents.toString());
				let result = template(data); 
				console.log(writeName+" generated");
				fs.writeFileSync(writeName, result);
			}
			})
	};
	readAllFiles(dirname, mkDir);
	return `${data.fileLocation}`;
};

//creatingBotFiles("./templates/", collectUserInput());
