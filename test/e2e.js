gt.module('fetching downloads for user');

var path = require('path');
var proudPath = path.join(__dirname, '../index.js');

gt.async('downloads for jashkenas', 1, function () {
  gt.exec('node', [proudPath, 'jashkenas'], 0);
}, 10000);

gt.module('using as module');

var proud = require('..');

gt.async('downloads for jashkenas', function () {
  proud('jashkenas')
  .then(function (counts) {
    gt.object(counts, 'have counts');
    gt.number(counts.underscore, 'has counts for underscore');
    gt.ok(Object.keys(counts).length > 3, 'more than 3 modules');
    gt.start();
  })
  .catch(function (err) {
    gt.ok(false, 'caught error', err);
    gt.start();
  });
}, 10000);
