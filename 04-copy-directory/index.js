const { copyFile, mkdir, readdir, unlink } = require('fs/promises');
const { join } = require('path');

async function copyDir(from, to) {
  try {
    await mkdir(to, {recursive: true});

    const dirs = await readdir(from, {withFileTypes: true});
    const filesTo = await readdir(to, {withFileTypes: true});

    // неизвестно стало больше файлов или меньше,
    // поэтому нужно удалять все либо проверять поочередно и если нужно - удалять
    if(filesTo.length > 0) {
      for(const file of filesTo) {
        if(!file.isDirectory()) {
          unlink(join(to, file.name));
        }
      }
    }

    for(let dir of dirs) {
      const src = join(from, dir.name);
      const target = join(to, dir.name);

      if(dir.isDirectory()) {
        await copyDir(src, target);
      } else {
        await copyFile(src, target);
      }
    }
  } catch(e) {
    console.error(e);
  }
}

const to = join(__dirname, 'files-copy');
const from = join(__dirname, 'files');
copyDir(from, to);

module.exports = copyDir;