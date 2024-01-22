const fs = require('fs').promises;
const path = require('path');
const { handleError } = require('../01-read-file/index');
const { copyDirectory } = require('../04-copy-directory/index');
const { mergeStyles } = require('../05-merge-styles/index');

async function buildHtmlBundle(templatePath, componentsPath, to) {
  try {
    let templateContent = await fs.readFile(templatePath, 'utf8');
    const templateTags = templateContent.match(/{{(.*?)}}/g);
    for (const templateTag of templateTags) {
      const tagName = templateTag.slice(2, -2);
      const correspondingComponentPath = path.join(
        componentsPath,
        `${tagName}.html`,
      );
      try {
        const componentsContent = await fs.readFile(
          correspondingComponentPath,
          'utf8',
        );
        templateContent = templateContent.replace(
          templateTag,
          componentsContent,
        );
      } catch (err) {
        handleError(err);
      }
    }
    await fs.writeFile(to, templateContent);
  } catch (err) {
    handleError(err);
  }
}

async function buildPage() {
  try {
    const distFolderPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(distFolderPath, { recursive: true });

    const assetsPath = path.join(__dirname, 'assets');
    const assetsCopyPath = path.join(distFolderPath, 'assets');
    await copyDirectory(assetsPath, assetsCopyPath);

    const stylesFolderPath = path.join(__dirname, 'styles');
    const stylesBundlePath = path.join(distFolderPath, 'style.css');
    await mergeStyles(stylesFolderPath, stylesBundlePath);

    const templatePath = path.join(__dirname, 'template.html');
    const componentsPath = path.join(__dirname, 'components');
    const htmlBundlePath = path.join(distFolderPath, 'index.html');
    buildHtmlBundle(templatePath, componentsPath, htmlBundlePath);
  } catch (err) {
    handleError(err);
  }
}

buildPage();
