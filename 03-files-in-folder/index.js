const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(__dirname, 'secret-folder', file.name);
          const fileName = file.name.split('.')[0];
          const fileExtension = file.name.split('.')[1];
          fs.stat(filePath, (err, data) => {
            if (err) throw err;
            else
              process.stdout.write(
                `${fileName} - ${fileExtension} - ${data.size}\n`,
              );
          });
        }
      });
    }
  },
);
