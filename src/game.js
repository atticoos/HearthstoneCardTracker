var Game = {};

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
