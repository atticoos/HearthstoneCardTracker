'use strict';
import React from 'react';
import Game from './game';
import Card from './card';
import IPC from './deck-manager/ipc';

function groupCards (groups, card) {
  var groupIndex = groups.findIndex(cardGroup => {
    return cardGroup[0].id === card.id;
  });
  if (groupIndex > -1) {
    groups[groupIndex].push(card);
  } else {
    groups.push([card]);
  }
  return groups;
}

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
  getCards() {
    if (!this.state.deck) {
      return [];
    }
    var deckCards = this.state.deck.cards.reduce(groupCards, []);
    var drawnCards = this.state.cardsDrawn.reduce(groupCards, []);

    console.log('deck cards', deckCards);
    console.log('drawn cards', drawnCards);

    return deckCards.reduce((partition, deckCardGroup) => {
      var drawn = drawnCards.find((drawnCardGroup) => {
        return drawnCardGroup[0].id === deckCardGroup[0].id;
      });
      if (drawn && drawn.length === deckCardGroup.length) {
        partition[1].push(deckCardGroup);
      } else {
        partition[0].push(deckCardGroup);
      }
      return partition;
    }, [[],[]]).map(partitions => {
      // @TODO sort each partition
      return partitions
    }).reduce((flattened, partition) => {
      return flattened.concat(partition);
    }, []);
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
    // var rows = this.state.deck.cards.reduce((collection, current) => {
    //   var groupIndex = collection.findIndex((group) => {
    //     return group[0].id === current.id;
    //   });
    //   if (groupIndex > -1) {
    //     collection[groupIndex].push(current);
    //   } else {
    //     collection.push([current]);
    //   }
    //   return collection;
    // }, [])

    var rows = this.getCards().map(cardGroup => {
      console.log('cardGroup', cardGroup);
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
