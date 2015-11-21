var _ = require('lodash');

function Handler (name, filters) {
  this.name = name;
  this.filters = filters || [];
  this.matcher = new RegExp('(\\[' + this.name + '\\])', 'g');
}

Handler.prototype.matches = function (string) {
  return this.matcher.test(string.toString());
};

Handler.prototype.handle = function (string) {
  _.chain(this.filters)
  .filter(function (filter) {
    return filter.pattern.test(string);
  }).each(function (filter) {
    var matches = filter.pattern.exec(string);
    // console.log('match found for [' + this.name + ']', filter.pattern, string);
    filter.handler.apply(this, matches.slice(1, matches.length));
  }.bind(this))
  .run();
};

module.exports = Handler;
