var Tail = require('tail').Tail;
var path = require('path');

var through = require('through2');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var PATH = '/Users/ajwhite/Library/Preferences/Blizzard/Hearthstone/Logs';
var FILE = 'hearthstone_2015_11_20_20_52_22.log';

var spawn = require('child_process').spawn;


module.exports = {
  load: function () {
    return fs.readdirAsync(PATH).then(function (files) {
      var file = files.pop();
      console.log('loading log file', file);
      return new Tail(path.join(PATH, file));
    });
  },
  spawn: function () {
    return fs.readdirAsync(PATH).then(function (files) {
      var file = files.pop();
      var child = spawn('tail', ['-f', path.join(PATH, file)]);
      return child.stdout;
    });
  }
};
