const path = require('path');
const fs = require('fs');

const pathToFileCopy = path.join(__dirname, 'files-copy');
const pathToFile = path.join(__dirname, 'files');


function callback(err) {
  if (err) throw err;
}

fs.mkdir(pathToFileCopy, { recursive: true }, (err) => {
  if (err) throw err;

});


fs.readdir(pathToFileCopy,{ withFileTypes: true }, (err, files) => {
  files.forEach(el => {
    if (!el.isDirectory()) {
      let dest = path.join(__dirname, 'files-copy', el.name);
      fs.unlink(dest, err =>{
        if (err) throw err;
      });
    }
  });
});

fs.readdir(pathToFile, { withFileTypes: true }, (err, files) => {
  files.forEach(el => {
    if (!el.isDirectory()) {
      let sourse = path.join(__dirname, 'files', el.name);
      let dest = path.join(__dirname, 'files-copy', el.name);
      fs.copyFile(sourse, dest, callback);
    }
  });
});


