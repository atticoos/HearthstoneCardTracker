var Power = require('./power');
var Bob = require('./bob');
var Asset = require('./asset');
var _ = require('lodash');
var handlers = {
  Power: new Power(),
  Bob: new Bob(),
  Asset: new Asset()
};

module.exports.getHandler = function (line) {
  _(handlers).filter(function (handler) {
    return handler.matches(line);
  }).each(function (handler) {
    handler.handle(line);
  })
  .run();

  // var matchedHandler = _.find(handlers, function (handler) {
  //   console.log('handler', handler.name, handler.matches);
  //   return handler.matches(line);
  // });
  //
  // if (matchedHandler) {
  //   matchedHandler.handle(line);
  // }
};
