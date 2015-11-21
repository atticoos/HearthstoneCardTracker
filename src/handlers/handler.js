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
  var handler = _.find(this.filters, function (filter) {
    return filter.pattern.test(string);
  });
  if (handler) {
    handler.handler(string);
  }
};

module.exports = Handler;
