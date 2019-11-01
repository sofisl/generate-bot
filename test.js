	/*
TODO: 
-data validation test: make sure names has no hyphens or integers and nothing is null (also add data validation)
-make sure directory is the same order test: create helper function to read directory structure recursively, then create a stack and compare to test stack - (expect.eql())
	-can create a stack with string path names vs. actual paths
-test: make sure handlebars compiles where needed (snapshots for this)
-
*/

const GenerateBot = require('./');
const expect = require('chai');
const fs = require('fs');
const recursive = require('recursive-readdir');
const rimraf = require('rimraf');

describe("file structure", () => {
	it('checks that file structure carries over', async() => {
		let originalStack = [];
		let createdStack = [];
		recursive("./templates", function(err, files) {
			originalStack.push(files);
		});
		recursive(GenerateBot('./templates', {programName: 'programName', 
			    description: 'description', 
			    fileLocation: './templates'}), function(err, files) {
			    createdStack.push(files);
		}); 		
	expect(originalStack).to.eql(createdStack);
				
  	afterEach(() => {
    		rimraf.sync('./templates');
  		});
});
