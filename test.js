
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
		let createdStack = await recursive(GenerateBot.creatingBotFiles('./templates', {programName: 'programName', 
			    description: 'description', 
			    fileLocation: './tmp'}));
		createdStack = createdStack.map(contents => {return contents.replace(/tmp/, 'templates')});
		console.log("OG "+originalStack);
		console.log("CS "+createdStack);
	expect(originalStack).to.eql(createdStack);
	});
			
  	afterEach(() => {
    		rimraf.sync('./tmp');
  		});
	/*
        it('checks that the file content carries over', () => {
		return snapshot(GenerateBot.creatingBotFiles('./templates', {programName: 'helloWorld', 
			description: 'says hi',
			fileLocation: './tmp'}));
	});

	 afterEach(() => {
		rimraf.sync('./tmp');
		});
*/

});
