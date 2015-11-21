var React = require('react');
var Game = require('./game');
var _ = require('lodash');
var Card = require('./card.jsx');

var Cards = React.createClass({
  getInitialState: function () {
    return {
      cards: []
    };
    // return {
    //   cards: [{ id: 'CS2_188',
    //   name: 'Abusive Sergeant',
    //   type: 'Minion',
    //   faction: 'Alliance',
    //   rarity: 'Common',
    //   cost: 1,
    //   attack: 2,
    //   health: 1,
    //   text: '<b>Battlecry:</b> Give a minion +2 Attack this turn.',
    //   flavor: 'ADD ME TO YOUR DECK, MAGGOT!',
    //   artist: 'Luca Zontini',
    //   collectible: true,
    //   mechanics: [ 'Battlecry' ] }]
    // };
  },
  componentDidMount: function () {
    console.log('type', this.props.type);
    Game.addListener(this.props.type, function (cards) {
      this.setState({cards: cards});
    }.bind(this));
  },
  componentWillUnmount: function () {
    // @TODO
  },
  render: function () {
    if (this.state.cards.length === 0) {
      return this.renderNoCards();
    } else {
      return this.renderCards();
    }
  },
  renderNoCards: function () {
    return (
      <p>No cards played</p>
    );
  },
  renderCards: function () {
    var rows = _.map(this.state.cards, function (card) {
      return (
        <Card card={card} />
      );
    });
    return (
      <div>{rows}</div>
    );
  }
});

module.exports = Cards;
