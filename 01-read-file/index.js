const fs = require('fs');
const path = require('path');
const { stdout, stderr } = process;

let file = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(file, 'utf8');
 
readableStream.on('data', function(chunk) {
  stdout.write(chunk);
});

readableStream.on('error', function(err) {
  stderr.write(`${err}`);
  console.log(err);
});


// import { join, resolve } from 'path';
// import { open } from 'node:fs/promises';
// import { stdout } from 'node:process';

// const __dirname = resolve();
// const text = join(__dirname, './01-read-file/text.txt');
// const fd = await open(text);
// const stream = fd.createReadStream();

// stream.on('readable', function () {
//   const data = stream.read();
//   data ? stdout.write(data) : console.log(`В файле по пути ${text} ничего нет `);
// });
