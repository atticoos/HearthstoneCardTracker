var React = require('react');

var Card = React.createClass({
  getBackgroundImage: function () {
    return [
      'url(',
      'http://wow.zamimg.com/images/hearthstone/cards/enus/original/',
      this.props.card.id,
      '.png)'
    ].join('');
  },
  render: function () {
    return (
      <div className="card" style={{backgroundImage: this.getBackgroundImage()}}>
        <span>{this.props.card.name}</span>
      </div>
    );
  }
});

module.exports = Card;
