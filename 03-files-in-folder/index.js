const {readdir} = require('fs/promises');
const {stat} = require('fs');
const {extname, join} = require('path');

const target = join(__dirname, 'secret-folder');

async function getFiles(dir) {
  const directory = await readdir(dir, {withFileTypes: true});

  for(const entry of directory) {
    let dirName = join(dir, entry.name);

    if(!entry.isDirectory()) {
      stat(dirName, (err, stat) => {
        if(err) {
          console.log(err);
        }

        let name = entry.name.replace(extname(dirName), '');
        let ext = extname(dirName);
        let sz = stat.size / 1000;

        console.log(`${name} - ${ext.replace('.', '')} - ${sz}kb`);
      });
    }
  }
}

getFiles(target);
