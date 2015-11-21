var http = require('http');
var faye = require('faye');

var server = http.createServer();
var bayeux = new faye.NodeAdapter({mount: '/'});

bayeux.attach(server);

module.exports = {
  start: function () {
    server.listen(8085);
  },
  publish: function (path, message) {
    return bayeux.getClient().publish(path, message);
  }
};
