var BrowserWindow = require('browser-window');
var playerWindow;
var opponentWindow;

module.exports = {
  createWindows: function () {
    playerWindow = new BrowserWindow({
      width: 600,
      height: 800
    });
    opponentWindow = new BrowserWindow({
      width: 600,
      height: 800
    });

    playerWindow.on('closed', function () {
      playerWindow = null;
    });

    opponentWindow.on('closed', function () {
      opponentWindow = null
    });

    playerWindow.loadUrl('file://' + __dirname + '/../windows/player-window.html');
    opponentWindow.loadUrl('file://' + __dirname + '/../windows/opponent-window.html');

    playerWindow.webContents.openDevTools();
    opponentWindow.webContents.openDevTools();
  },
  playerWindow: playerWindow,
  opponentWindow: opponentWindow
};
