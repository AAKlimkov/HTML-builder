const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;
const readline = require('readline');

const target = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(target, {
  flags: 'a'
});

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
      }
//      else {
//       rl.output.write(`${res}\n`);
//       sayBy();
//     }
  } else {
    console.log(`Received: ${input}`);
    rl.output.write(`${input}\n`);
  }
});

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

// import { createInterface } from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

// const rl = createInterface({ input, output });

// const answer = await rl.question('What do you think of Node.js? ');

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.on('line', (line) => {
//   console.log(`Received: ${line}`);
// });

// rl.close();

// import { createInterface } from 'readline';
// import { createWriteStream } from 'fs';
// import { join, resolve } from 'path';
// import { stdout } from 'process';

// const __dirname = resolve();
// const stream = createWriteStream(join(__dirname, './02-write-file/write.txt'));

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt:
//     'Do your want to write some more text to file?(Type exit or use ctrl+c to stop writing) \n',
// });

// function checkClose(text) {
//   return text.match(/e(xit)/i);
// }

// rl.question(
//   'What do your want to write to file?(Type exit or use ctrl+c to stop writing) \n',
//   (userInput) => {
//     if (checkClose(userInput)) {
//       rl.close();
//     } else {
//       stream.write(userInput + '\n');
//       rl.prompt();
//       rl.on('line', (userInput) => {
//         if (checkClose(userInput)) {
//           rl.close();
//         } else {
//           stream.write(userInput + '\n');
//           rl.prompt();
//         }
//       });
//     }
//   }
// );

// rl.on('close', () => {
//   stdout.write('Write Complete');
// });
