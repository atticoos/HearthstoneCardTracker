'use strict';
import BrowserWindow from 'browser-window';
import electron from 'electron';
var {
  Menu,
  Tray
} = electron;

const WINDOW_WIDTH = 200;
const WINDOW_HEIGHT = 400;
var windowManager = {};
var playerWindow;
var opponentWindow;
var deckManagerWindow;

function createWindow (options) {
  return new BrowserWindow(Object.assign({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    'title-bar-style': 'hidden'
  }, options || {}));
}

function createDeckmanagerWindow (options) {
  return new BrowserWindow(Object.assign({
    width: 800,
    height: 700
  }, options || {}));
}

windowManager.createWindows = () => {
  var display = electron.screen.getPrimaryDisplay();
  console.log('display', display);
  playerWindow = createWindow({
    x: display.bounds.width - WINDOW_WIDTH,
    y: display.workArea.y,
    height: display.workArea.height
  });
  opponentWindow = createWindow({
    x: 0,
    y: display.workArea.y,
    height: display.workArea.height
  });

  playerWindow.on('closed', () => {
    playerWindow = null;
  });

  opponentWindow.on('closed', () => {
    opponentWindow = null
  });

  playerWindow.loadUrl('file://' + __dirname + '/windows/player-window.html');
  opponentWindow.loadUrl('file://' + __dirname + '/windows/opponent-window.html');

  // playerWindow.webContents.openDevTools();
  // opponentWindow.webContents.openDevTools();

  var applicationTray = new Tray(__dirname + '/tray.png');
  var contextMenu = Menu.buildFromTemplate([
    {label: 'Manage Decks', click: () => windowManager.openDeckManager()}
  ]);
  applicationTray.setContextMenu(contextMenu);
};

windowManager.openDeckManager = () => {
  if (deckManagerWindow) {
    deckManagerWindow.focus();
  } else {
    deckManagerWindow = createDeckmanagerWindow();
    deckManagerWindow.loadUrl('file://' + __dirname + '/windows/deck-manager-window.html');
    // deckManagerWindow.webContents.openDevTools();
  }
};
windowManager.sendToBothWindows = (key, value) => {
  [playerWindow, opponentWindow].forEach(browserWindow => {
    browserWindow.send(key, value);
  });
};
windowManager.updatePlayerDeck = (deck) => {
  playerWindow.webContents.send('/deck', {deck: deck});
}
windowManager.updatePlayerWindowCards = (cards) => {
  playerWindow.webContents.send('/player', {cards: cards});
};
windowManager.updateOpponentWindowCards = (cards) => {
  opponentWindow.webContents.send('/opponent', {cards: cards});
};

windowManager.playerWindow = playerWindow;
windowManager.opponentWindow = opponentWindow;

export default windowManager;
