var ipcRenderer = window.require('electron').ipcRenderer;

function selectDeck(deck) {
  ipcRenderer.send('deck-selected', deck);
}

function openDeckManager() {
  ipcRenderer.send('open-deck-manager');
}

export default {selectDeck, openDeckManager};
