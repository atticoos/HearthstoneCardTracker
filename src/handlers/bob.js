var Handler = require('./handler');
var Game = require('../game');
var _ = require('lodash');

function BobHandler () {
  var filters = [
    {pattern: /(---RegisterScreenCollectionManager---)/i, handler: this.onCollection},
    {pattern: /(---RegisterFriendChallenge---)/i, handler: this.onFriendChallenge},
    {pattern: /(---RegisterScreenPractice---)/i, handler: this.onPracticeScreen},
    {pattern: /(---RegisterScreenTourneys---)/i, handler: this.onCasualScreen},
    {pattern: /(---RegisterScreenFriendly---)/i, handler: this.onFriendlyScreen},
    {pattern: /(---RegisterScreenForge---)/i, handler: this.onArenaScreen},
    {pattern: /(---RegisterProfileNotices---)/i, handler: this.onGameLoaded},
  ]
  Handler.call(this, 'Bob', filters);
}

BobHandler.prototype = _.create(Handler.prototype, {constructor: BobHandler});

BobHandler.prototype.onCollection = function () {
  Game.onCollection();
};

BobHandler.prototype.onFriendChallenge = function () {
  Game.onFriendChallenge();
};

BobHandler.prototype.onPracticeScreen = function () {
  Game.onPracticeScreen();
};

BobHandler.prototype.onCasualScreen = function () {
  Game.onCasualScreen();
};

BobHandler.prototype.onFriendlyScreen = function () {
  Game.onFriendlyScreen();
};

BobHandler.prototype.onArenaScreen = function () {
  Game.onArenaScreen();
};

BobHandler.prototype.onGameLoaded = function () {
  Game.onGameLoaded();
};

module.exports = BobHandler;
