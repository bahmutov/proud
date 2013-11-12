#!/usr/bin/env node

var check = require('check-types');
var Q = require('q');
var registry = require('npm-stats')();

var username = process.argv[2];
if (!check.unemptyString(username)) {
  console.log('need username');
  process.exit(-1);
}

var user = registry.user(username);
var list = Q.nbind(user.list, user);

list().then(function (data) {
  check.verify.array(data, 'expected data to be an array');
  console.log('user', username, 'has', data.length, 'registered modules');
  console.log(data);
}).catch(function (err) {
  console.error(err);
  process.exit(-2);
});
