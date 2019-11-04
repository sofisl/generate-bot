
	/*
TODO: 
-data validation test: make sure names has no hyphens or integers and nothing is null (also add data validation)
-make sure directory is the same order test: create helper function to read directory structure recursively, then create a stack and compare to test stack - (expect.eql())
	-can create a stack with string path names vs. actual paths
-test: make sure handlebars compiles where needed (snapshots for this)
-
*/

const GenerateBot = require('./main.js');
const { expect } = require('chai');
const fs = require('fs');
const recursive = require('recursive-readdir');
const rimraf = require('rimraf');
const snapshot = require('snap-shot');

describe("file structure", () => {
	it('checks that file structure carries over', async() => {
		const originalStack = await recursive('./templates');
		GenerateBot.creatingBotFiles('./templates', {programName: 'programName', 
			    description: 'description', 
			    fileLocation: './tmp'});
		let createdStack = await recursive('./tmp');
		createdStack = createdStack.map(contents => {return contents.replace(/tmp/, 'templates')});
		console.log("OG "+originalStack);
		console.log("CS "+createdStack);
	expect(originalStack).to.eql(createdStack);
	});
			
  	afterEach(() => {
    		rimraf.sync('./tmp');
  		});
	
        it('checks that the file content carries over', async() => {
		GenerateBot.creatingBotFiles('./templates', {programName: 'helloWorld', 
			description: 'says hi',
			fileLocation: './tmp'});
		const files = await recursive('./tmp');
		let stringOfFiles = null;
		for (let i=0; i<files.length; i++) {
			stringOfFiles += fs.readFileSync(files[i], 'utf8')
		};
		console.log(stringOfFiles);
		return snapshot(stringOfFiles);
		//implement snapshot logic here that reads the contents of the files recursively
	});

	 afterEach(() => {
		rimraf.sync('./tmp');
		});


});

