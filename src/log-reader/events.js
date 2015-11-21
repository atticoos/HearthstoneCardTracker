var Stream = require('./stream');
var Handlers = require('./handlers');
var _ = require('lodash');

module.exports = {
  start: function () {
    Stream.spawn().then(function (stream) {
      stream.on('data', function (data) {
        _.forEach(data.toString().split('\n'), function (line) {
          Handlers.getHandler(line);
        });
      });
    });
  }
};
