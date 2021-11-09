const fs = require('fs/promises');
const path = require('path');

async function createHtml(compPath, templPath, dest) {
  let template = await fs.readFile(templPath,'utf8' );
  const items = await fs.readdir(compPath);
  if (items.length) {
    for (const item of items) {
      const stats = await fs.stat(path.join(compPath, item));
      if (stats.isFile()) {
        const name = path.parse(item).name;
        const ext = path.parse(item).ext;
        if (ext == '.html' && template.includes(`{{${name}}}`)) {
          const data = await fs.readFile(path.join(compPath, item), { encoding: 'utf8' });
          template = template.replace(`{{${name}}}`, data);
        }
      }
    }
  }
  fs.writeFile(dest, template);
}

async function createStyles(src, dest) {
  const items = await fs.readdir(src);
  if (items.length) {
    for (const item of items) {
      const stats = await fs.stat(path.join(src, item));
      if (stats.isFile()) {
        const ext = path.parse(item).ext;
        if (ext == '.css') {
          const data = await fs.readFile(path.join(src, item));
          await fs.appendFile(dest, data);
        }
      }
    }
  }
}

async function copyAssets(src, dest) {
  const stats = await fs.stat(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    await fs.mkdir(dest, { recursive: true });
    const items = await fs.readdir(src);
    for (const item of items) {
      copyAssets(path.join(src, item), path.join(dest, item));
    }
  } else await fs.copyFile(src, dest);
}

async function buildPage() {
  await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  createHtml(path.join(__dirname, 'components'), path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist' ,'index.html'));
  createStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist' ,'style.css'));
  copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
}

buildPage();