var Handler = require('./handler');
var Game = require('../../game');
var _ = require('lodash');

function ZoneHandler () {
  var filters = [
    // player receives a card
    {
      pattern: /TRANSITIONING card.* id=(\d+).*cardId=(\w+).*to FRIENDLY HAND/i,
      handler: this.cardAddedToHand
    },

    {
      pattern: /TRANSITIONING card.* id=(\d+).*cardId=(\w+).*to OPPOSING PLAY$/i,
      handler: this.cardPlayedByOpponent
    }
  ];
  Handler.call(this, 'Zone', filters);
}

ZoneHandler.prototype = _.create(Handler.prototype, {constructor: ZoneHandler});

ZoneHandler.prototype.cardAddedToHand = function (id, cardId) {
  Game.playerCardDiscovered(cardId);
};

ZoneHandler.prototype.cardPlayedByOpponent = function (id, cardId) {
  Game.opponentCardDiscovered(cardId);
};

module.exports = ZoneHandler;
