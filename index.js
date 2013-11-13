#!/usr/bin/env node

var check = require('check-types');
var q = require('q');
var print = require('./src/print');

var registry = require('npm-stats')();

function userModules(username) {
  check.verify.unemptyString(username, 'expected username');

  var user = registry.user(username);
  var list = q.nbind(user.list, user);

  var fetchStats = require('./src/stats');

  return list().then(fetchStats.bind(null, username));
}

if (module.parent) {
  module.exports = userModules;
} else {

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

  userModules(username)
  .then(print)
  .catch(function (err) {
    console.error(err);
    process.exit(-2);
  });
}


