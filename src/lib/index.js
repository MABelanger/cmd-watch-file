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

// the parameters of the cli

let { version, patternToWatch, cmd, _: filePathWatch } = minimist(argCmd);

if (version) {
  printVersion();
} else if (patternToWatch && cmd && filePathWatch.length > 0) {
  console.log(patternToWatch, cmd, filePathWatch[0]);
  tailWatch(patternToWatch, cmd, filePathWatch[0]);
} else { // if wrong usage, print the help
  printHelp();
}
