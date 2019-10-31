const { prompt } = require('enquirer');
const Handlebars = require('handlebars');
const fs = require('fs');

async function programName() {
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
       } 
    ]); 
}



async function handlebarCompiler() {
   const data = await programName();
   //console.log(await programName());

   //console.log('a');
   fs.readdir("./templates/", function(err, items) {
   	if (err) throw err;
	//console.log('b');
	//console.log(items.length);
   	for (var i=0; i<items.length; i++) {
		//console.log(items.length);
		let currentFile = items[i];
		fs.readFile("./templates/"+currentFile, function(err, contents) {
			if (err) throw err
			//console.log('c');
			//console.log(currentFile);
			let source = contents.toString();
			console.log(source);
			let template = Handlebars.compile(source);
			let result = template(data);
			console.log(result);
			fs.writeFile("./"+currentFile, result, function(err, contents) {
				if (err) throw err
				console.log(currentFile+" generated")
			});
		 });
	}  
    });
}


handlebarCompiler();
