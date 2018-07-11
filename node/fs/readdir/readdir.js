let fs = require('fs');
let path = require('path');

fs.readdir('./twice', (err, res) => {
  console.log('fs readdir: ' + typeof(res));
  console.log('fs readdir result: ' + res);
  console.log('fs readdir object keys' + Object.keys(res));
  console.log('fs readdir res[1]: ' + res[1]);
});

fs.readFile('./test.text', (err, res) => {
  if (err) console.log('readFile error: ' + err);
  else { console.log('readFile result: ' + res); }
});
