import React from 'react';
import Hearthstats from './hearthstats-service';
import {Link} from 'react-router';
import History from './history';
import Cards from 'hearthstone-log-adapter/src/cards';
import Card from '../card';

class Deck extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: null
    };
  }
  componentDidMount() {
    var deckId = this.props.params.id;
    Hearthstats.getDeck(deckId).then(deck => {
      console.log('das deck', deck);
      this.setState({deck: deck});
    });
  }
  render() {
    return (
      <div className="container deck">
        <button onClick={() => History.goBack()}>back</button>
        {this.renderByState()}
      </div>
    );
  }
  renderByState() {
    if (!this.state.deck) {
      return (
        <h2>Loading your deck..</h2>
      );
    } else {
      return this.renderDeck();
    }
  }
  renderDeck() {
    var cards = this.state.deck.cards.map(card => {
      return (
        <Card card={card} />
      );
    });
    return (
      <div className="deck">
        <h2>Deck: {this.state.deck.name}</h2>
        <div className="cards">
          {cards}
        </div>
      </div>
    );
  }
}

export default Deck;
