import React from 'react';
import Hearthstats from './hearthstats-service';

class Decks extends React.Component {
  constructor() {
    super();
    this.state = {
      decks: null
    };
  }
  componentDidMount() {
    Hearthstats.getDecks()
    .then(decks => this.setState({decks: decks}));
  }
  render() {
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
          <h3>{deck.name}</h3>
        </div>
      )
    });
    return (
      <div className="decks">
        <h2>Decks:</h2>
        {decks}
      </div>
    )
  }
}

export default Decks;
