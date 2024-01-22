const fs = require('fs').promises;
const path = require('path');

function handleError(error) {
  console.error(`Error: ${error.message}`);
}

const filePath = path.join(__dirname, 'text.txt');

async function readSomeFile(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    console.log(data);
  } catch (err) {
    handleError(err);
  }
}

// run only if direct execution
if (require.main === module) {
  readSomeFile(filePath);
}

module.exports = { handleError };
