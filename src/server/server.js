var http = require('http');
var faye = require('faye');
var Events = require('./events');

var server = http.createServer();
var bayeux = new faye.NodeAdapter({mount: '/'});

bayeux.attach(server);

module.exports = {
  start: function () {
    Events.start();
    server.listen(8085);

    setInterval(function () {
      bayeux.getClient().publish('/test', {foo: 'bar'});
      console.log('publishing');
    }, 1000);
  }
};
