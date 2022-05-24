
const { mkdir, readdir, readFile, appendFile, truncate } = require('fs/promises');
const { join, extname, basename } = require('path');
const mergeStyles = require('../05-merge-styles');
const copyDir = require('../04-copy-directory');

async function removeHTML(targetHTML, dist) {
  try {
    const dir = await readdir(dist);
    const bundleName = 'index.html';

    if(dir.includes(bundleName)) {
      await truncate(targetHTML);
    }
  } catch(err) {
    console.log(err);
  }
}

async function generateHtml(targetHTML) {
  try {
    const dirTpl = join(__dirname, 'components');
    const tplComponents = await readdir(dirTpl, {withFileTypes: true});
    let template = await readFile(join(__dirname, 'template.html'), 'utf-8');

    for(let tpl of tplComponents) {
      const ext = extname(tpl.name);
      const tplName = basename(tpl.name, ext);
      const tplContent = await readFile(join(dirTpl, tpl.name), 'utf-8');

      const regex = new RegExp(`{{${tplName}}}`, 'g');
      template = template.replace(regex, tplContent);
    }

    appendFile(targetHTML, template, err => {
      if(err) console.log(err);
    });
  } catch(err) {
    console.log(err);
  }
}

async function generateBuild() {
  const dist = join(__dirname, 'project-dist');
  await mkdir(dist, {recursive: true});
  
  const targetHTML = join(__dirname, 'project-dist', 'index.html');
  await removeHTML(targetHTML, dist);
  await generateHtml(targetHTML);

  const from = join(__dirname, 'assets');
  const to = join(__dirname, 'project-dist', 'assets');
  await copyDir(from, to);

  const bundleCSS = 'style.css';
  const fromCSS = join(__dirname, 'styles');
  const toCSS = join(__dirname, 'project-dist');
  const targetCSS = join(__dirname, 'project-dist', bundleCSS);
  await mergeStyles(fromCSS, toCSS, targetCSS, bundleCSS);
}

generateBuild();

// importgit 