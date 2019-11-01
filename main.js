const { prompt } = require('enquirer');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')

async function collectUserInput() {
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
	message: 'Where do you want to save this program?'
	//TODO: figure out how to implement this specification in file writing function 
	}
    ]); 
}

/*

async function handlebarCompiler() {
   const data = await programName();
   //console.log(await programName());
   
   fs.mkdirSync(`../${data.programName}`);
   console.log(`${data.programName}`+" generated")
   //console.log('a');
   fs.readdir("./templates/", function(err, items) {
   	if (err) throw err;
	//console.log('b');
	//console.log(items.length);
   	for (var i=0; i<items.length; i++) {
		//console.log(items.length);
		let currentFile = items[i];
		fs.readFile(path.join(path.dirname(),currentFile), function(err, contents) {
			if (err) throw err
			//console.log('c');
			//console.log(currentFile);
			let source = contents.toString();
			//console.log(source);
			let template = Handlebars.compile(source);
			let result = template(data);
			//console.log(result);
			fs.writeFile(`../${data.programName}/${currentFile}`, result, function(err, contents) {
				if (err) throw err
				console.log(currentFile+" generated")
			});
		 });
	}  
    });
}

*/
//handlebarCompiler();




async function creatingBotFiles() {
	const data = await collectUserInput();
	fs.mkdirSync(`../${data.programName}`);
	console.log(`${data.programName}`+ " generated");

	let dirname = "./templates/"
	let mkDir = `../${data.programName}/`

	let readAllFiles = function(dirname) {
		console.log('a');
		let files = fs.readdirSync(dirname);
		files.forEach(function(file) {
		console.log('b');
		let readName = path.join(dirname, file);
		let writeName = path.join(mkDir, file);
			if (fs.statSync(name).isDirectory()) {
				console.log('c');
				fs.mkdirSync(writeName);
				readAllFiles(readName);
			}
		else {
			console.log('d');
			fs.writeFileSync(writeName);
		}
		})
	};
	readAllFiles(dirname);
};


creatingBotFiles();
