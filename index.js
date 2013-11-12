var check = require('check-types');
var registry = require('npm-stats')();

var username = process.argv[2];
if (!check.unemptyString(username)) {
  console.log('need username');
  process.exit(-1);
}

registry.user(username).list(function (err, data) {
  if (err) {
    throw new err;
  }
  check.verify.array(data, 'expected data to be an array');
  console.log('user', username, 'has', data.length, 'registered modules');
  console.log(data);
});
