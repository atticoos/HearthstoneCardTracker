var Game = {};

Game.setPlayingState = function () {
  console.log('GAME PLAYING');
};

Game.setNotPlayingState = function () {
  console.log('GAME STOPPED PLAYING');
};

Game.setRankedMode = function () {
  console.log('ranked mode');
};

Game.cardPlayed = function (card) {
  console.log('card played', card);
};

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
