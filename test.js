const GenerateBot = require("./");
const {expect} = require('chai');
const fs = require('fs');
const rimraf = require('rimraf');

describe("GenerateBot", () => {
  it("creates a folder for the new bot", async () => {
    GenerateBot({
      programName: 'testbot',
      root: './tmp'
    })
    expect(fs.statSync('./tmp/testbot').isDirectory()).to.equal(true);
  });

  afterEach(() => {
    rimraf.sync('./tmp');
  });
});
