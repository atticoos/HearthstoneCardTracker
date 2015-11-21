var electron = require('electron');
var app = electron.app;
var WindowManager = require('./server/window-manager');
var Server = require('./server/server');

require('crash-reporter').start();

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  Server.start();
  WindowManager.createWindows();
});
