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


// fs.readFile('text.txt', 'utf8', function(error, data) {
//   console.log(error, data);
// });
