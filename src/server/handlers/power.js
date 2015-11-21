var Handler = require('./handler');
var Game = require('../game');
var _ = require('lodash');

console.log('POEWR GAME', Game);

function PowerHandler () {
  var filters = [
    // game started
    {
      pattern: /(CREATE_GAME)/i,
      handler: this.onGameStarted
    },

    // enemy spell cast at a target
    {
      pattern: /ACTION_START.*Entity=.*id=(\d+).*cardId=(\w+).*player=2.*BlockType=POWER.*Target=[^\d].*/i,
      handler: this.onOpponentAction
    }
  ];
  Handler.call(this, 'Power', filters);
}

PowerHandler.prototype = _.create(Handler.prototype, {constructor: PowerHandler});

PowerHandler.prototype.onGameStarted = function () {
  Game.setPlayingState();
};

PowerHandler.prototype.onOpponentAction = function (id, cardId) {
  Game.opponentCardDiscovered(cardId);
};

module.exports = PowerHandler;
