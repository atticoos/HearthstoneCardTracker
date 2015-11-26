import EventEmitter from 'events';
import {ipcRenderer} from 'electron';


class Game extends EventEmitter {
  constructor() {
    super();
    ipcRenderer.on('/player', this.onPlayerCards.bind(this));
    ipcRenderer.on('/opponent', this.onOpponentCards.bind(this));
    ipcRenderer.on('/deck', this.onDeckSelected.bind(this));
  }
  onPlayerCards (evt, response) {
    this.emit('player', response.cards);
  }
  onOpponentCards (evt, response) {
    this.emit('opponent', response.cards);
  }
  onDeckSelected (evt, response) {
    this.emit('playerDeck', response.deck);
    console.log('player deck selected', response.deck);
  }
}

export default new Game();
