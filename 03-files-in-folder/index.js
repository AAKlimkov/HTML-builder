
const path = require('path');
const fs = require('fs');
const { stat } = require('fs');

const pathToFolder = path.join(__dirname, 'secret-folder');


fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  files.forEach(el => {
    if (!el.isDirectory()) {
      const name = el.name.substr(0,el.name.indexOf('.'));
      const exten = path.extname(path.join(pathToFolder, el.name)).substr(1);
      stat(path.join(pathToFolder, el.name), (err, stats) => {
        let size = stats.size;
        console.log(name + ' - ' + exten + ' - ' + Math.round(size/1024)  + ' kb');
      });
    }
  });
});

// console.log(filess);

// filess.forEach(el => console.log(el.isDirectory()));

// async function reads() {
//   try {
//     const files = await readdir(pathToFolder);
//     for (const file of files)
//       console.log(file);

//   } catch (err) {
//     console.error(err);
//   }
// }


// reads();

