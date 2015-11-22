'use strict';
import React from 'react';
import Game from './game';
import Card from './card';

class Cards extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }
  componentDidMount() {
    Game.addListener(this.props.type, this.onCard.bind(this));
  }
  componentWillUnmount() {
    Game.removeListener(this.props.type, this.onCard.bind(this));
  }
  onCard(cards) {
    this.setState({cards: cards});
  }
  render() {
    if (this.state.cards.length === 0) {
      return this.renderNoCards();
    } else {
      return this.renderCards();
    }
  }
  renderNoCards() {
    return (
      <p>No cards played</p>
    );
  }
  renderCards() {
    var rows = this.state.cards.reduce((collection, current) => {
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
        <Card card={cardGroup[0]}
              count={cardGroup.length}
              key={cardGroup[0].id} />
      );
    });
    return (
      <div>{rows}</div>
    );
  }
}



var MOCK_CARDS =[{ id: 'CS2_188',
name: 'Abusive Sergeant',
type: 'Minion',
faction: 'Alliance',
rarity: 'Common',
cost: 1,
attack: 2,
health: 1,
text: '<b>Battlecry:</b> Give a minion +2 Attack this turn.',
flavor: 'ADD ME TO YOUR DECK, MAGGOT!',
artist: 'Luca Zontini',
collectible: true,
mechanics: [ 'Battlecry' ] },{ id: 'CS2_188',
name: 'Abusive Sergeant',
type: 'Minion',
faction: 'Alliance',
rarity: 'Common',
cost: 1,
attack: 2,
health: 1,
text: '<b>Battlecry:</b> Give a minion +2 Attack this turn.',
flavor: 'ADD ME TO YOUR DECK, MAGGOT!',
artist: 'Luca Zontini',
collectible: true,
mechanics: [ 'Battlecry' ] },{ id: 'CS2_187',
name: 'Abusive Sergeant',
type: 'Minion',
faction: 'Alliance',
rarity: 'Common',
cost: 1,
attack: 2,
health: 1,
text: '<b>Battlecry:</b> Give a minion +2 Attack this turn.',
flavor: 'ADD ME TO YOUR DECK, MAGGOT!',
artist: 'Luca Zontini',
collectible: true,
mechanics: [ 'Battlecry' ] }];

export default Cards;
