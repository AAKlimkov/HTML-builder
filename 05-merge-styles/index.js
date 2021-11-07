const fs = require('fs');
const path = require('path');

const workFolder = path.join(__dirname, 'styles');



fs.readdir(workFolder, { withFileTypes: true }, (err, files) => {
  const fileWriteStream = new fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

  streamMergeRecursive(files, fileWriteStream);
  function streamMergeRecursive(files, fileWriteStream) {
    if (!files.length) {
      return fileWriteStream.end(`${console.log('Слияние потока завершено')}`);
      // Наконец, закрываем доступный для записи поток, чтобы предотвратить утечку памяти
    }

    const currentFile = path.join(workFolder, files.shift().name); // получаем текущий файл, метод шифт уменьшит наш массив на 1 элемент
    if (path.extname(path.join(workFolder, currentFile)).substr(1) == 'css') { //проверяем расширение
      const currentReadStream = fs.createReadStream(currentFile); //создаем поток чтения
      currentReadStream.pipe(fileWriteStream, { end: false }); // записываем в файл, не заканчивая поток
      currentReadStream.on('end', function () { // закрываем текущий поток чтения, рекурсивно вызвав объеденения файлов,
        streamMergeRecursive(files, fileWriteStream);
      });
    } else{                                        // если мы не прошли по типу файла, просто вызываем еще раз объединение
      streamMergeRecursive(files, fileWriteStream);
    }
  }
});

