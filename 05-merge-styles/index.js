const fs = require('fs').promises;
const path = require('path');
const { handleError } = require('../01-read-file/index');

const stylesDirectoryPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles(from, to) {
  try {
    const files = await fs.readdir(from, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      const isCss = file.name.split('.')[1] === 'css';
      if (file.isFile() && isCss) {
        const filePath = path.join(from, file.name);
        const data = await fs.readFile(filePath, 'utf8');
        styles.push(data);
      }
    }
    await fs.writeFile(to, styles.join('\n'));
    // console.log('Styles successfully merged!');
  } catch (err) {
    handleError(err);
  }
}

// run only if direct execution
if (require.main === module) {
  mergeStyles(stylesDirectoryPath, distPath);
}

module.exports = { mergeStyles };
