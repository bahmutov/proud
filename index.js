#!/usr/bin/env node

var check = require('check-types');
var q = require('q');
var moment = require('moment');
var registry = require('npm-stats')();
var print = require('./src/print');

var updateNotifier = require('update-notifier');
var notifier = updateNotifier();
if (notifier.update) {
  notifier.notify();
}

var username = process.argv[2];
if (!check.unemptyString(username)) {
  var pkg = require('./package.json');
  var info = pkg.name + ' - ' + pkg.description + '\n' +
    '  version: ' + pkg.version + '\n' +
    '  author: ' + JSON.stringify(pkg.author);
  console.log(info);
  console.log('need username:', pkg.name, '<npm username>');
  process.exit(-1);
}

var today = moment();
var monthAgo = today.subtract('months', 1);
var user = registry.user(username);
var list = q.nbind(user.list, user);

// name -> number of downloads
var counts = {};

list().then(function (data) {
  check.verify.array(data, 'expected data to be an array');
  console.log('user', username, 'has', data.length, 'registered modules');
  if (!data.length) {
    return;
  }
  // console.log(data);

  // data = data.slice(0, 5);
  var downloadFns = data.map(function (name) {
    var moduleName = registry.module(name);
    var downloads = q.nbind(moduleName.downloads, moduleName);

    return downloads;
  });

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
      // console.log('stats', name, 'downloads', count);
      process.stdout.write('stats ' +  name + ' downloads ' + count + '               \r');
      counts[name] = count;
    });
  });

  result.done(function () {
    print(counts);
  });

}).catch(function (err) {
  console.error(err);
  process.exit(-2);
});
