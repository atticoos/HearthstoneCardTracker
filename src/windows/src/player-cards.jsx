'use strict';
import React from 'react';
import Game from './game';
import Card from './card';
import IPC from './deck-manager/ipc';

class PlayerCards extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: null,
      cardsDrawn: []
    };
  }
  componentDidMount() {
    // @TODO make these unbindable
    Game.on('player', this.onCardDrawn);
    Game.on('playerDeck', this.onDeckSelected);
  }
  componentWillUnmount() {
    Game.removeListener('player', this.onCardDrawn);
    Game.removeListener('playerDeck', this.onDeckSelected);
  }
  onCardDrawn = (cards) => {
    this.state.cardsDrawn = cards;
    this.setState(this.state);
  }
  onDeckSelected = (deck) => {
    this.state.deck = deck;
    this.setState(this.state);
  }
  openDeckManager = () => {
    IPC.openDeckManager();
  }
  getNumberOfDrawsForCard(card) {
    return this.state.cardsDrawn.filter(drawnCard => {
      return drawnCard.id === card.id;
    }).length;
  }
  render() {
    return (
      <div>
        {this.renderByState()}
      </div>
    );
  }
  renderByState() {
    if (!this.state.deck) {
      return this.renderSelectDeck();
    } else {
      return this.renderCards();
    }
  }
  renderSelectDeck() {
    return (
      <button onClick={this.openDeckManager}>Select a Deck</button>
    );
  }
  renderCards() {
    var rows = this.state.deck.cards.reduce((collection, current) => {
      var groupIndex = collection.findIndex((group) => {
        return group[0].id === current.id;
      });
      if (groupIndex > -1) {
        collection[groupIndex].push(current);
      } else {
        collection.push([current]);
      }
      return collection;
    }, []).map(cardGroup => {
      return (
        <Card
              drawn={this.getNumberOfDrawsForCard(cardGroup[0])}
              card={cardGroup[0]}
              count={cardGroup.length}
              key={cardGroup[0].id} />
      );
    });
    return (
      <div>{rows}</div>
    );
  }
}

export default PlayerCards;
