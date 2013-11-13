var check = require('check-types');
var q = require('q');
var moment = require('moment');
var registry = require('npm-stats')();
var print = require('./print');
var sprintf = require('sprintf-js').sprintf;

var today = moment();
var monthAgo = today.subtract('months', 1);

// name -> number of downloads
var counts = {};

function stats(username, data) {
  check.verify.array(data, 'expected data to be an array');
  console.log('user', username, 'has', data.length, 'registered modules');
  if (!data.length) {
    return;
  }
  // data = data.slice(0, 5);
  var downloadFns = data.map(function (name) {
    var moduleName = registry.module(name);
    var downloads = q.nbind(moduleName.downloads, moduleName);

    return downloads;
  });

  function printBlankLine() {
    process.stdout.write(sprintf('%50s\n', ' '));
  }

  var result = q();
  downloadFns.forEach(function (downloadFn, index) {
    var name = data[index];
    result = result.then(downloadFn).then(function (stats) {
      check.verify.array(stats, 'expected stats for ' + name + ' to be an array');
      stats = stats.filter(function (dateCount) {
        var date = moment(dateCount.date, 'YYYY-MM-DD');
        return date.isAfter(monthAgo);
      });

      var count = stats.reduce(function (sum, dateCount) {
        return sum + dateCount.value;
      }, 0);
      process.stdout.write(sprintf('%3d %25s has %5d downloads\r', index + 1, name, count));
      counts[name] = count;
    });
  });

  result.done(function () {
    printBlankLine(); // after process.stdout.write \r
    print(counts);
  });
}

module.exports = stats;