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

  getClassName() {
    var classNames = ['card'];
    if (this.getCount() === 0) {
      classNames.push('drawn');
    }
    return classNames.join(' ');
  }

  getCount() {
    return this.props.count - this.props.drawn;
  }

  render() {
    return (
      <div className={this.getClassName()}
           style={{backgroundImage: this.getBackgroundImage()}}>
        <span className="cost">{this.props.card.cost}</span>
        <span className="name">{this.props.card.name}</span>
        {this.renderConditionalCount()}
      </div>
    );
  }

  renderConditionalCount() {
    if (this.getCount() > 1) {
      return (
        <span className="count">{this.getCount()}</span>
      );
    } else {
      return null;
    }
  }
}

export default Card;
