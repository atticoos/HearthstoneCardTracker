var Handler = require('./handler');
var _ = require('lodash');

function BobHandler () {
  var filters = [
    {pattern: /(---RegisterScreenCollectionManager---)/i, handler: this.onCollection.bind(this)},
    {pattern: /(---RegisterFriendChallenge---)/i, handler: this.onFriendChallenge.bind(this)},
    {pattern: /(---RegisterScreenPractice---)/i, handler: this.onPracticeScreen.bind(this)},
    {pattern: /(---RegisterScreenTourneys---)/i, handler: this.onCasualScreen.bind(this)},
    {pattern: /(---RegisterScreenFriendly---)/i, handler: this.onFriendlyScreen.bind(this)},
    {pattern: /(---RegisterScreenForge---)/i, handler: this.onArenaScreen.bind(this)},
    {pattern: /(---RegisterProfileNotices---)/i, handler: this.onGameLoaded.bind(this)},
  ]
  Handler.call(this, 'Bob', filters);
}

BobHandler.prototype = _.create(Handler.prototype, {constructor: BobHandler});

BobHandler.prototype.onCollection = function () {
  console.log('on game collection screen');
};

BobHandler.prototype.onFriendChallenge = function () {
  console.log('on friend challenge');
};

BobHandler.prototype.onPracticeScreen = function () {
  console.log('on practice screen');
};

BobHandler.prototype.onCasualScreen = function () {
  console.log('on play mode screen');
};

BobHandler.prototype.onFriendlyScreen = function () {
  console.log('on friendly screen');
};

BobHandler.prototype.onArenaScreen = function () {
  console.log('on arena screen');
};

BobHandler.prototype.onGameLoaded = function () {
  console.log('on game loaded');
};

module.exports = BobHandler;
