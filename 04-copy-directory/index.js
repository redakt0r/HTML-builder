const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

const existFolderPath = path.join(__dirname, 'files');
const newFolderPath = `${existFolderPath}-copy`;

function copyDirectory(from, to) {
  fs.mkdir(to, { recursive: true }, (err) => {
    if (err) throw err;
    else {
      fs.readdir(from, (err, files) => {
        if (err) throw err;
        else {
          files.forEach((fileName) => {
            const filePathFrom = path.join(from, fileName);
            const filePathTo = path.join(to, fileName);
            fs.copyFile(filePathFrom, filePathTo, (err) => {
              if (err) throw err;
            });
          });
          console.log('Folder successfully copied!');
        }
      });
    }
  });
}

copyDirectory(existFolderPath, newFolderPath);
