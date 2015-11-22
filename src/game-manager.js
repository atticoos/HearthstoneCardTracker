'use strict';
import WindowManager from './window-manager';
import HearthstoneLogAdapter from 'hearthstone-log-adapter';

const GAME_STATE = {
  PLAYING: 'playing',
  IDLE: 'idle'
};
var Game = {};
var gameState = GAME_STATE.IDLE;
var playerCards = [];
var opponentCards = [];


Game.setPlayingState = () => {
  console.log('GAME PLAYING');
};

Game.setNotPlayingState = () => {
  console.log('GAME STOPPED PLAYING');
};

Game.opponentCardDiscovered = (card) => {
  opponentCards.push(card);
  WindowManager.updateOpponentWindowCards(opponentCards);
  console.log('opponent card discovered', card);
};

Game.playerCardDiscovered = (card) => {
  playerCards.push(card);
  WindowManager.updatePlayerWindowCards(playerCards);
  console.log('player card discovered', card);
};

module.exports = Game;
