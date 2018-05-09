'use strict';
import { Tail } from 'tail';
import { execSync } from 'child_process';

function _isContainPattern (str, patternToWatch) {
  return str.includes(patternToWatch);
}

function tailWatch (patternToWatch, cmd, filePathWatch) {
  const tail = new Tail(filePathWatch);

  tail.on('line', function (line) {
    if (_isContainPattern(line, patternToWatch)) {
      let out = execSync(cmd);
      console.log('out:', out.toString());
    }
  });

  tail.on('error', function (error) {
    console.log('ERROR: ', error);
  });
}

module.exports = {
  tailWatch
};
