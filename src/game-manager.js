'use strict';
import WindowManager from './window-manager';
import HearthstoneLogAdapter from 'hearthstone-log-adapter';
const Events = HearthstoneLogAdapter.Events;
const LOG_DIRECTORY = '/Users/ajwhite/Library/Preferences/Blizzard/Hearthstone/Logs';
const GAME_STATE = {
  PLAYING: 'playing',
  IDLE: 'idle'
};
var Game = {};
var logAdapter = new HearthstoneLogAdapter(LOG_DIRECTORY);
var gameState = GAME_STATE.IDLE;
var playerCards = [];
var opponentCards = [];

Game.gameStarted = () => {
  console.log('GAME PLAYING');
};

Game.gameEnded = () => {
  console.log('GAME STOPPED PLAYING');
  playerCards = [];
  opponentCards = [];
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

Game.start = () => {
  logAdapter.start();
};

logAdapter.addListener(Events.OPPONENT_CARD, Game.opponentCardDiscovered);
logAdapter.addListener(Events.PLAYER_CARD, Game.playerCardDiscovered);
logAdapter.addListener(Events.GAME_STARTED, Game.gameStarted);
logAdapter.addListener(Events.GAME_ENDED, Game.gameEnded);

module.exports = Game;
