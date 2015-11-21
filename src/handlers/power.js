var Handler = require('./handler');
var Game = require('../game');
var _ = require('lodash');

function PowerHandler () {
  var filters = [
    // game started
    {
      pattern: /(CREATE_GAME)/i,
      handler: this.onGameStarted
    },

    // card played
    {
      pattern: /FULL_ENTITY.*Updating.*id=(\d+).*cardId=(\w*)/i,
      handler: this.cardPlayed
    }
  ];
  Handler.call(this, 'Power', filters);
}

PowerHandler.prototype = _.create(Handler.prototype, {constructor: PowerHandler});

PowerHandler.prototype.onGameStarted = function () {
  Game.setPlayingState();
};

PowerHandler.prototype.cardPlayed = function (updateId, cardId) {
  Game.cardPlayed(cardId);
};

module.exports = PowerHandler;
