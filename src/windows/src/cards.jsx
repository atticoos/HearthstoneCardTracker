var React = require('react');
var Game = require('./game');
var _ = require('lodash');

var Cards = React.createClass({
  getInitialState: function () {
    return {
      cards: []
    };
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
        <div>{ card.name }</div>
      );
    });
    return (
      <div>{rows}</div>
    );
  }
});

module.exports = Cards;
