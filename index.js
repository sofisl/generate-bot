const fs = require("fs");
const path = require("path");
// const Handlebars = require("handlebars");

async function recursiveCompiler(opts) {
  const root = opts.root || "./";
  fs.mkdirSync(path.resolve(root, `./${opts.programName}`), {
    recursive: true
  });
  /*console.log(`${opts.programName}` + "generated");
  let currentDirectory = `./${opts.programName}/`;
  // look up withFileTypes.
  const files = fs.readdirSync("./templates/");
  const filelist = [];
  console.info(`creating directory ${currentDirectory}`);
  fs.mkdirSync(currentDirectory);
  files.forEach(function(file) {
    if (fs.statSync(file).isDirectory()) {
      console.warn('we do not yet support recursive reading');
    } else {
      filelist.push(file);
      fs.writeFile(path.join(currentDirectory, file));
    }
  });*/
  /*const readAllFiles = function(dir, filelist) {
    const files = fs.readdirSync("./templates/");
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = readAllFiles(path.join(dir + file), filelist);
        currentDirectory = path.join(currentDirectory, dir + file);
        fs.mkdirSync(currentDirectory);
      } else {
        filelist.push(file);
        fs.writeFile(path.join(currentDirectory, file));
      }
    });
  };
  readAllFiles();*/
}

module.exports = recursiveCompiler;