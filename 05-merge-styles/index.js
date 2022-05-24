const { readdir, truncate } = require('fs/promises');
const { join, extname } = require('path');
const { createReadStream, appendFile } = require('fs');

async function mergeStyles(from, to, target, bundle) {
  try {
    const files = await readdir(from, {withFileTypes: true});
    const filesTo = await readdir(to);

    if(filesTo.includes(bundle)) {
      await truncate(target);
    }

    for(const file of files) {
      let fileFrom = join(from, file.name);

      if(!file.isDirectory() && extname(fileFrom) === '.css') {
        let readableStream = createReadStream(fileFrom, 'utf8');

        readableStream.on('data', chunk => {
          appendFile(target, chunk, err => {
            if(err) console.log(err);
          });
        });
      }
    }
  } catch(err) {
    console.error('err', err);
  }
}

const bundle = 'bundle.css';
const from = join(__dirname, 'styles');
const to = join(__dirname, 'project-dist');
const target = join(__dirname, 'project-dist', bundle);

mergeStyles(from, to, target, bundle);

module.exports = mergeStyles;


// import { readdir, truncate } from 'fs/promises';
// import { join, extname, resolve } from 'path';
// import { createReadStream, appendFile } from 'fs';

// const __dirname = resolve();

// async function mergeStyles(from, to, target, bundle) {
//   try {
//     const files = await readdir(from, { withFileTypes: true });
//     const filesTo = await readdir(to);

//     if (filesTo.includes(bundle)) {
//       await truncate(target);
//     }

//     for (const file of files) {
//       let fileFrom = join(from, file.name);

//       if (!file.isDirectory() && extname(fileFrom) === '.css') {
//         let readableStream = createReadStream(fileFrom, 'utf8');

//         readableStream.on('data', (chunk) => {
//           appendFile(target, chunk, (err) => {
//             if (err) console.log(err);
//           });
//         });
//       }
//     }
//   } catch (err) {
//     console.error('err', err);
//   }
// }

// const bundle = 'bundle.css';
// const from = join(__dirname, './05-merge-styles/styles');
// const to = join(__dirname, './05-merge-styles/project-dist');
// const target = join(__dirname, './05-merge-styles/project-dist', bundle);

// mergeStyles(from, to, target, bundle);

// export default mergeStyles;
