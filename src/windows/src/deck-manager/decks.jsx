import React from 'react';
import Hearthstats from './hearthstats-service';
import {Link} from 'react-router';
import IPC from './ipc';

class Decks extends React.Component {
  constructor() {
    super();
    this.state = {
      decks: null
    };
  }
  componentDidMount() {
    var testCard = {
      foo: 'bar',
      id: 'CS2_084',
      name: 'Atticus'
    };

    var cards = [testCard, testCard, testCard];
    IPC.selectDeck({
      cards: cards
    });

    Hearthstats.getDecks()
    .then(decks => this.setState({decks: decks}));
  }
  selectDeck(selectedDeck) {
    console.log('selecting deck', selectedDeck);
    Hearthstats.getDeck(selectedDeck.id).then(deck => {
      console.log('selected deck', deck);
      IPC.selectDeck(deck);
    });
  }
  render() {
    return (
      <div className="container decks">
        {this.renderByState()}
      </div>
    )
  }
  renderByState() {
    if (this.state.decks === null) {
      return (
        <h2>Loading..</h2>
      );
    } else if (this.state.decks.length === 0) {
      return (
        <h2>No decks!</h2>
      );
    } else {
      return this.renderDecks();
    }
  }
  renderDecks() {
    var decks = this.state.decks.map(deck => {
      return (
        <div key={deck.id}>
          <h3>{deck.name} (W{deck.user_num_wins} - L{deck.user_num_losses})</h3>
          <Link to={`/decks/${deck.id}`}>View</Link>
          <button onClick={() => this.selectDeck(deck)}>Select</button>
        </div>
      )
    });
    return (
      <div>
        <h2>Decks:</h2>
        {decks}
      </div>
    )
  }
}

export default Decks;
