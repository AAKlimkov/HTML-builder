const readline = require('readline');
const fs = require('fs');
const path = require('path');
const stream = new fs.createWriteStream(path.join(__dirname, 'write.txt'));


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do your want to write to file? \n', (userInput) => {
  if (userInput == 'exit') {
    rl.close();
  }
  else {
    rl.setPrompt('Do your want write some more test? \n');
    stream.write(userInput+'\n');
    rl.prompt();
    rl.on('line', (userInput) => {
      if (userInput == 'exit') {
        rl.close();
      }
      else {
        stream.write(userInput+'\n');
        rl.prompt();
      }});
  }

});


rl.on('close', () => {
  console.log('Write Complete');
});
