const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;
const readline = require('readline');

const target = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(target, {
  flags: 'a'
});

// input The Readable stream to listen to.
// output The Writable stream to write readline data to.
const rl = readline.createInterface({
  input: stdin,
  output: writeStream
});

sayHi();

rl.on('line', input => {
  if(input.includes('exit')) {
    let res = input.replace('exit', '');
    if(res === '') {
      sayBy();
    } else {
      rl.output.write(`${res}\n`);
      sayBy();
    }
  } else {
    console.log(`Received: ${input}`);
    rl.output.write(`${input}\n`);
  }
});

// TODO: SIGINT with rl
process.on('SIGINT', () => {
  sayBy();
});

function sayBy(str = '') {
  stdout.write(`${str}By-by!`);
  process.exit();
}

function sayHi() {
  stdout.write('Hello! Type someting...\n');
}
