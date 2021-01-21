var fs = require('fs');

fs.appendFile('newfile.txt', 'Placeholder text!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });