var BrowserWindow = require('browser-window');
var playerWindow;
var opponentWindow;

function createWindow () {
  return new BrowserWindow({
    width: 200,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    'title-bar-style': 'hidden'
  });
}

module.exports = {
  createWindows: function () {
    playerWindow = createWindow();
    opponentWindow = createWindow();

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
  playerWindow: playerWindow,
  opponentWindow: opponentWindow
};
