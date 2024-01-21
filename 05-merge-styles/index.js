const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

const stylesDirectoryPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');

function mergeStyles(from, to) {
  fs.readdir(from, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
      const styles = [];
      files.forEach((file) => {
        const isCss = file.name.split('.')[1] === 'css';
        if (file.isFile() && isCss) {
          const filePath = path.join(from, file.name);
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw err;
            else {
              styles.push(data);
              fs.writeFile(
                path.join(to, 'bundle.css'),
                styles.join('\n'),
                (err) => {
                  if (err) throw err;
                },
              );
            }
          });
        }
      });
    }
  });
}

mergeStyles(stylesDirectoryPath, distPath);
