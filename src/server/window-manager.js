var BrowserWindow = require('browser-window');
var electron = require('electron');
var _ = require('lodash');
var playerWindow;
var opponentWindow;
var WINDOW_WIDTH = 200;
var WINDOW_HEIGHT = 400;

function createWindow (options) {
  return new BrowserWindow(_.extend({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    'title-bar-style': 'hidden'
  }, options || {}));
}

module.exports = {
  createWindows: function () {
    var display = electron.screen.getPrimaryDisplay();
    playerWindow = createWindow({
      x: display.bounds.width - WINDOW_WIDTH,
      y: 10
    });
    opponentWindow = createWindow({
      x: 0,
      y: 10
    });

    playerWindow.on('closed', function () {
      playerWindow = null;
    });

    opponentWindow.on('closed', function () {
      opponentWindow = null
    });

    playerWindow.loadUrl('file://' + __dirname + '/../windows/player-window.html');
    opponentWindow.loadUrl('file://' + __dirname + '/../windows/opponent-window.html');

    // playerWindow.webContents.openDevTools();
    // opponentWindow.webContents.openDevTools();
  },
  updatePlayerWindowCards: function (cards) {
    playerWindow.webContents.send('/player', {cards: cards});
  },
  updateOpponentWindowCards: function (cards) {
    opponentWindow.webContents.send('/opponent', {cards: cards});
  },
  playerWindow: playerWindow,
  opponentWindow: opponentWindow
};
