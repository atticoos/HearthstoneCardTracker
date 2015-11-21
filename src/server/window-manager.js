var BrowserWindow = require('browser-window');
var playerWindow;
var opponentWindow;

module.exports = {
  createWindows: function () {
    playerWindow = new BrowserWindow({
      width: 400,
      height: 500
    });
    opponentWindow = new BrowserWindow({
      width: 400,
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

    playerWindow.webContents.openDevTools();
    opponentWindow.webContents.openDevTools();
  },
  playerWindow: playerWindow,
  opponentWindow: opponentWindow
};
