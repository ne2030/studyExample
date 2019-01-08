const childProcess = require('child_process')
  , phantomjs = require('phantomjs')
  , path = require('path');

const binPath = phantomjs.path;
const childArgs = [
  path.join(__dirname, 'phantom-script.js')
];

const child = childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
  if (err) console.log(err);
  else console.log(stdout);
});
