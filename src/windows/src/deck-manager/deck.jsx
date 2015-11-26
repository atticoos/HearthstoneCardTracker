import React from 'react';
import Hearthstats from './hearthstats-service';
import {Link} from 'react-router';
import History from './history';
import IPC from './ipc';
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
  selectDeck() {
    IPC.selectDeck(this.state.deck);
  }
  render() {
    return (
      <div className="container view-deck">
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
        <h2>Deck: </h2>
        <div className="clearfix">
          <div className="cards">
            {cards}
          </div>
          <div className="info">
            <div className="summary">
              <div className="title">
                <div className="hero"></div>
                <h2>{this.state.deck.name}</h2>
              </div>
              <h1>{this.state.deck.user_num_wins} - {this.state.deck.user_num_losses}</h1>
            </div>
            <div className="controls">
              <a className="button" onClick={() => this.selectDeck()}>Select Deck</a>
              <a className="button" onClick={() => History.goBack()}>Back</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Deck;
