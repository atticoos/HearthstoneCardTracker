var Cards = require('./data/cards.json');
var _ = require('lodash');

module.exports = {
  getCardById: function (cardId) {
    return _(Cards)
      .values()
      .flatten()
      .find(function (card) {
        return card.id === cardId;
      });
  }
};
