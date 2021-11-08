const fs = require('fs');
const path = require('path');

const text = path.join(__dirname,'../01-read-file/text.txt');
const stream = new fs.ReadStream(text, 'utf-8');

stream.on('readable', function(){
  const data = stream.read();
  console.log(data);
});   