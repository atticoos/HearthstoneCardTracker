var Handler = require('./handler');
var _ = require('lodash');

function PowerHandler () {
  Handler.call(this, 'Power');
}

PowerHandler.prototype = _.create(Handler.prototype, {constructor: PowerHandler});

module.exports = PowerHandler;
