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
    Hearthstats.getDecks()
    .then(decks => {
      console.log('decks', decks);
      return decks;
    })
    .then(decks => this.setState({decks: decks}));
  }
  selectDeck(selectedDeck) {
    Hearthstats.getDeck(selectedDeck.id).then(deck => {
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
        <div className="deck" key={deck.id}>
          <div className="title">
            <div className="hero warlock"></div>
            <h3>{deck.name} (W{deck.user_num_wins} - L{deck.user_num_losses})</h3>
            <Link to={`/decks/${deck.id}`} className="button">View</Link>
            <a className="button" onClick={() => this.selectDeck(deck)}>Select</a>
          </div>
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
