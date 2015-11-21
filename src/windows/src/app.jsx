var React = require('react');
var Game = require('./game');
var _ = require('lodash');

var Cards = require('./cards.jsx');
if (document.getElementById('player-root')) {
  React.render(<Cards type="player" />, document.getElementById('player-root'));
} else {
  React.render(<Cards type="opponent" />, document.getElementById('opponent-root'));
}
