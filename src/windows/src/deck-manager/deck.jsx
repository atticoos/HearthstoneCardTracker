import React from 'react';
import Hearthstats from './hearthstats-service';
import {Link} from 'react-router';
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
      deck.cards = deck.cards.map(card => {
        return Cards.getById(card.blizz_id);
      });
      console.log('deck', deck);
      this.setState({deck: deck});
    });
  }
  render() {
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
