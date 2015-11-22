'use strict';
import electron from 'electron';
import GameManager from './game-manager';
import WindowManager from './window-manager';
import CrashReporter from 'crash-reporter';

var app = electron.app;
CrashReporter.start();

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  WindowManager.createWindows();
  GameManager.start();
});
