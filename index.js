#!/usr/bin/env node

var check = require('check-types');
var q = require('q');
var moment = require('moment');
var registry = require('npm-stats')();
var _ = require('lodash');
var Table = require('easy-table');

var username = process.argv[2];
if (!check.unemptyString(username)) {
  console.log('need username');
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
    counts = _.pairs(counts);
    counts = _.sortBy(counts, function (nameCount) {
      return nameCount[1];
    });
    counts = counts.reverse();
    var total = counts.reduce(function (sum, nameCount) {
      return sum + nameCount[1];
    }, 0);
    counts.push(['Total', total]);

    var t = new Table();
    counts.forEach(function (nameCount) {
      t.cell('Module', nameCount[0]);
      t.cell('Downloads last month', nameCount[1]);
      t.newRow();
    });

    console.log(t.toString());
  });

}).catch(function (err) {
  console.error(err);
  process.exit(-2);
});
