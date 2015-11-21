var EventEmitter = require('events');
var Faye = require('faye');
var _ = require('lodash');

function Game () {
  // var client = new module.exports.Client('http://localhost:8085');
  f.subscribe('/player', this.onPlayerCards.bind(this));
  f.subscribe('/opponent', this.onOpponentCards.bind(this));
  EventEmitter.call(this);
}

Game.prototype = _.create(EventEmitter.prototype, {constructor: Game});

Game.prototype.onPlayerCards = function (response) {
  console.log('/player', response);
  this.emit('player', response.cards);
};

Game.prototype.onOpponentCards = function (response) {
  console.log('/opponent', response);
  this.emit('opponent', response.cards);
};

module.exports = new Game();
