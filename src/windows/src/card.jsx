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
        {this.renderConditionalCount()}
        <span className="name">{this.props.card.name}</span>
      </div>
    );
  },
  renderConditionalCount: function () {
    if (this.props.count > 1) {
      return (
        <span className="count">{this.props.count}</span>
      );
    } else {
      return null;
    }
  }
});

module.exports = Card;
