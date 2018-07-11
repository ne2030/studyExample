const childProcess = require('child_process')
  , path = require('path');

const child = childProcess.execFile('node', ['test'], (err, stdout, stderr) => {
  if (err) console.log(err);
  else console.log(stdout);
});
