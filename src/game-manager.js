'use strict';
import WindowManager from './window-manager';
import HearthstoneLogAdapter from 'hearthstone-log-adapter';

var GAME_STATE = {
  PLAYING: 'playing',
  IDLE: 'idle'
};
var Game = {};
var gameState = GAME_STATE.IDLE;
var playerCards = [];
var opponentCards = [];


Game.setPlayingState = function () {
  console.log('GAME PLAYING');
};

Game.setNotPlayingState = function () {
  console.log('GAME STOPPED PLAYING');
};

Game.setRankedMode = function () {
  console.log('ranked mode');
};

// Game.opponentCardDiscovered = function (cardId) {
//   var card = Cards.getCardById(cardId);
//   opponentCards.push(card);
//   WindowManager.updateOpponentWindowCards(opponentCards);
//   console.log('opponent card discovered', card);
// };
//
// Game.playerCardDiscovered = function (cardId) {
//   var card = Cards.getCardById(cardId);
//   playerCards.push(card);
//   WindowManager.updatePlayerWindowCards(playerCards);
//   console.log('player card discovered', card);
// };

Game.onCollection = function () {
  console.log('on game collection screen');
};

Game.onFriendChallenge = function () {
  console.log('on friend challenge');
};

Game.onPracticeScreen = function () {
  console.log('on practice screen');
};

Game.onCasualScreen = function () {
  console.log('on play mode screen');
};

Game.onFriendlyScreen = function () {
  console.log('on friendly screen');
};

Game.onArenaScreen = function () {
  console.log('on arena screen');
};

Game.onGameLoaded = function () {
  console.log('on game loaded');
};

module.exports = Game;
