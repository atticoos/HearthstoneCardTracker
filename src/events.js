var Stream = require('./stream');
var Handlers = require('./handlers');
var moment = require('moment');
var dateMatcher = new RegExp('(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}.\\d{3})', 'i');
var lastLogLineTime = null;

Stream.load().then(function (stream) {
  stream.on('line', function (line) {
    var logLineTime = getDateFromLogLine(line);
    if (logLineTime) {
      if (!lastLogLineTime || lastLogLineTime.isBefore(logLineTime)) {
        lastLogLineTime = logLineTime;
        Handlers.getHandler(line);
      }
    }
  })
});

function getDateFromLogLine (line) {
  var match = dateMatcher.exec(line);
  if (match) {
    return moment(match[0]);
  } else {
    return null;
  }
}
