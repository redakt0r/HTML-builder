const fs = require('fs').promises;
const path = require('path');
const { handleError } = require('../01-read-file/index');

const existFolderPath = path.join(__dirname, 'files');
const newFolderPath = `${existFolderPath}-copy`;

async function copyDirectory(from, to) {
  try {
    const isFromExists = await fs
      .access(from)
      .then(() => true)
      .catch(() => false);
    if (!isFromExists) {
      console.error(`No such directory '${from}'`);
      return;
    }
    await fs.mkdir(to, { recursive: true });
    const files = await fs.readdir(from);
    for (const file of files) {
      const filePathFrom = path.join(from, file);
      const filePathTo = path.join(to, file);
      const isDirectory = (await fs.stat(filePathFrom)).isDirectory();
      if (isDirectory) {
        await copyDirectory(filePathFrom, filePathTo);
      } else {
        await fs.copyFile(filePathFrom, filePathTo);
      }
      // await fs.copyFile(filePathFrom, filePathTo);
    }
    console.log('Folder successfully copied!');
  } catch (err) {
    handleError(err);
  }
}

// run only if direct execution
if (require.main === module) {
  copyDirectory(existFolderPath, newFolderPath);
}

module.exports = { copyDirectory };
