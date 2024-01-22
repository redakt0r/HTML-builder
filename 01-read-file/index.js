const fs = require('fs');
const path = require('path');

function handleError(error) {
  console.error(`Error: ${error.message}`);
}

const filePath = path.join(__dirname, 'text.txt');

async function readSomeFile(path) {
  try {
    const readStream = fs.createReadStream(path, 'utf8');
    readStream.on('data', (data) => console.log(data));
  } catch (err) {
    handleError(err);
  }
}

// run only if direct execution
if (require.main === module) {
  readSomeFile(filePath);
}

module.exports = { handleError };
