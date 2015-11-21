var electron = require('electron');
var app = electron.app;
var Events = require('./log-reader/events');
var WindowManager = require('./windows/manager');

require('crash-reporter').start();

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  Events.start();
  WindowManager.createWindows();
});
