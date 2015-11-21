var BrowserWindow = require('browser-window');
var playerWindow;
var opponentWindow;

module.exports = {
  createWindows: function () {
    playerWindow = new BrowserWindow({
      width: 200,
      height: 500
    });
    opponentWindow = new BrowserWindow({
      width: 200,
      height: 500
    });

    playerWindow.on('closed', function () {
      playerWindow = null;
    });

    opponentWindow.on('closed', function () {
      opponentWindow = null
    });

    playerWindow.loadUrl('file://' + __dirname + '/../windows/window.html');
    opponentWindow.loadUrl('file://' + __dirname + '/../windows/window.html');
  },
  playerWindow: playerWindow,
  opponentWindow: opponentWindow
};
