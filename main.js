const { prompt } = require('enquirer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

exports.checkValidity = function(testString) {
 	let isValid = true;
	const invalidChars = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	let string = JSON.stringify(testString)
	for (var i=0; i<invalidChars.length; i++) {
		if (string.includes(invalidChars[i])) {
			isValid = false;
			console.log("You used an invalid character, like a hyphen or an integer. Please try again.");
			break;
		}
	}
	
	if (isValid && (!(testString.programName)|| !(testString.fileLocation))) {
		isValid = false;
		console.log("You forgot to name your program and/or your file location. Please try again.");
	}
	
	console.log(testString);
	return isValid;
}

exports.collectUserInput = async function() {
let isValid = false;
let input = null;
while (!isValid) {
    input =  await prompt([
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

	isValid = exports.checkValidity(input);
}

	console.log(await input);
	return await input;
}



exports.creatingBotFiles = function(dirname, data) {
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
};

