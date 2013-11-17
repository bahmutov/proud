# proud v0.0.6

> Collects NPM download stats for a developer

## Use

```
npm install -g proud
proud 'username'

// prints number of modules for 'username'
// prints total number of downloads for all modules
```



### Related

* [proud-badge](https://github.com/bahmutov/proud-badge) generates badges
* [proud-connect](https://github.com/bahmutov/proud-connect) is a stand alone
server generating badges with caching
* [proud-heroku-app](https://github.com/bahmutov/proud-heroku-app) is
a *proud-connect* service [running on Heroku](http://proud.herokuapp.com/)

## Why?

Because one should be **proud** of his work.

### Small print

Author: Gleb Bahmutov &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, click *endorse*, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github



## History


0.0.6 / 2013-11-17
==================

  * using grunt-readme to generate readme, fixes #10

0.0.5 / 2013-11-14
==================

  * removed global structure, fixes #8

0.0.4 / 2013-11-12
==================

  * added e2e tests, using as external module
  * refactoring to allow use from external modules

0.0.3 / 2013-11-12
==================

  * printing number showing progress, fixes #6
  * better formatting
  * prefer global

0.0.2 / 2013-11-12
==================

  * added better package info, fixes #4
  * added update notifier, fixes #5
  * prefer global

0.0.1 / 2013-11-11
==================

  * computing totals
  * using Q to grab list of modules


