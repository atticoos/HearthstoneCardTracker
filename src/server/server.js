// @TODO Replace server with IPC https://github.com/atom/electron/blob/master/docs/api/web-contents.md#webcontentssendchannel-arg1-arg2-

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
