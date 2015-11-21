var Power = require('./power');
var Bob = require('./bob');
var handlers = {
  Power: new Power(),
  Bob: new Bob()
};

module.exports = handlers;

module.exports.getHandler = function (line) {
  if (handlers.Power.matches(line)) {
    // console.log('power', line);
  }
  if (handlers.Bob.matches(line)) {
    handlers.Bob.handle(line);
    // console.log('bob', line);
  }
};
