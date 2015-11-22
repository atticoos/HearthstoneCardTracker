'use strict';
import React from 'react';

class Card extends React.Component {
  getBackgroundImage() {
    return [
      'url(',
      'http://wow.zamimg.com/images/hearthstone/cards/enus/original/',
      this.props.card.id,
      '.png)'
    ].join('');
  }

  render() {
    return (
      <div className="card" style={{backgroundImage: this.getBackgroundImage()}}>
        {this.renderConditionalCount()}
        <span className="name">{this.props.card.name}</span>
      </div>
    );
  }

  renderConditionalCount() {
    if (this.props.count > 1) {
      return (
        <span className="count">{this.props.count}</span>
      );
    } else {
      return null;
    }
  }
}

export default Card;
