const fs = require('fs').promises;
const path = require('path');
const { handleError } = require('../01-read-file/index');

// looks like this creepy table require additional memory usage bcs it needs to be stored before printing, but who cares?

function createTable(data) {
  const maxLength = Math.max(...data.map((str) => str.length));
  let table = '-'.repeat(maxLength + 4) + '\n';
  data.forEach((str) => {
    const padding = ' '.repeat(maxLength - str.length);
    table += `| ${str.trim()}${padding}  |\n`;
  });
  table += '-'.repeat(maxLength + 4);
  return table;
}

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFilesData(exactPath) {
  try {
    const files = await fs.readdir(exactPath, { withFileTypes: true });
    const filesData = [];
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(exactPath, file.name);
        const fileName = file.name.split('.')[0];
        const fileExtension = file.name.split('.')[1];
        const data = await fs.stat(filePath);
        filesData.push(
          `${fileName} - ${fileExtension} - ${data.size / 1000}kb\n`,
        );
      }
    }
    process.stdout.write(createTable(filesData));
  } catch (err) {
    handleError(err);
  }
}

displayFilesData(folderPath);
