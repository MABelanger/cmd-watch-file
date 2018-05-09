'use strict';
import minimist from 'minimist';
import {tailWatch} from './watch';

// const PATTERN = 'has fallen off the bus';
// const REBOOT_CMD = 'echo bibi';

// Take only the argument of the command.
const argCmd = process.argv.slice(2);

function printVersion () {
  console.log('0.0.0-beta');
}

function printHelp () {
  console.log(`
    Usage: mailatt [options] [file]

    Options:
      --version            output the version number

      --patternToWatch='<line pattern to watch>' (require)
      --cmd='<command to execute>' (require)

    File :
      Path file to watch
  `);
}

function printStatus (patternToWatch, cmd, filePathWatch) {
  console.log('');
  console.log('patternToWatch: ', patternToWatch);
  console.log('cmd: ', cmd);
  console.log('filePathWatch: ', filePathWatch);
}

// the parameters of the cli
let { version, patternToWatch, cmd, _: filePathWatchArray } = minimist(argCmd);

if (version) {
  printVersion();
} else if (patternToWatch && cmd && filePathWatchArray.length > 0) {
  const filePathWatch = filePathWatchArray[0];
  printStatus(patternToWatch, cmd, filePathWatch);
  tailWatch(patternToWatch, cmd, filePathWatch);
} else { // if wrong usage, print the help
  printHelp();
}
