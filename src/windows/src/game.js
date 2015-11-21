var EventEmitter = require('events');
var ipcRenderer = window.require('electron').ipcRenderer;
var _ = require('lodash');

function Game () {
  ipcRenderer.on('/player', this.onPlayerCards.bind(this));
  ipcRenderer.on('/opponent', this.onOpponentCards.bind(this));
  EventEmitter.call(this);
}

Game.prototype = _.create(EventEmitter.prototype, {constructor: Game});

Game.prototype.onPlayerCards = function (evt, response) {
  console.log('/player', response);
  this.emit('player', response.cards);
};

Game.prototype.onOpponentCards = function (evt, response) {
  console.log('/opponent', response);
  this.emit('opponent', response.cards);
};

module.exports = new Game();
