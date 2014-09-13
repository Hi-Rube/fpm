#!/usr/bin/env fibjs
;(function (){
  var process = require('process');
  var fpm = require('/usr/local/lib/fib_modules/.modules/fpm/lib/fpm');   //TODO:change
  fpm.action(process.argv);
})();

