var ipcRenderer = window.require('electron').ipcRenderer;

function selectDeck(deck) {
  ipcRenderer.send('deck-selected', deck);
}

export default {selectDeck};
