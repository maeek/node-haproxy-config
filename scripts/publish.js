/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const childProc = require('child_process');
const pkgPath = path.resolve(__dirname, '..', 'package.json');

fs.copyFileSync(pkgPath, path.join(__dirname, '..', 'build', 'package.json'));

console.log(
  childProc.execSync('npm publish', {
    cwd: path.resolve(__dirname, '..', 'build')
  }).toString()
);
