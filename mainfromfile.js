#!/home/ubuntu/.nvm/versions/node/v4.4.3/bin/node --harmony_destructuring
"use strict";
const process = require('process');
/* See gist: https://gist.github.com/branneman/8048520 
 * Better local require() paths for Node.js */
process.env.NODE_PATH += ":"+__dirname+"/models/";
require('module').Module._initPaths();
var util = require('util');
var fs = require('fs');
var PEG = require("parsernode.js");
var semantic = require("semantic");
var fileName = process.argv[2] || 'tests/input5.pl0';
const lineNumbers = (input) => {
  let count = 1;
  return input.replace(/^/mg, (x) => { 
      let str = ' '+count++;
      return (str.substr(str.length-2)+' ')
    });
};

fs.readFile(fileName, 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Processing <***\n${lineNumbers(input)}\n***>`);
  try {
    var r = PEG.parse(input);
    console.log(util.inspect(r, {depth: null}));
    semantic(r);
    console.log("\n\n\Tabla de símbolos\n\n\n");
     console.log(util.inspect(r, {depth: null}));
  } catch (e) {
    console.log(e);
  }
});

