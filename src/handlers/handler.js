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
    filter.handler.apply(this, matches.slice(1, matches.length));
  })
  .run();
};

module.exports = Handler;
