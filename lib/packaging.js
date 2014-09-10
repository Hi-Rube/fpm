/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 6:05 PM
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var colors = require('colors');
var util = require('util');
var packageJson = require('../storage/default_package.json');
var usage = require('../storage/usage');

var action = function (args) {
  if (args.length != 0) {
    switch (args[0]) {
      case '-h':
        usage.packageUsage();
        break;
      default :
        usage.packageUsage();
    }
    return;
  }
  var flag = fs.exists('./package.json');
  if (flag) {
    console.log('package.json already exists'.red.bold);
    return;
  }
  packageJson = util.format(packageJson);
  fs.writeFile('package.json', packageJson);
  console.log('package.json Created'.green.bold);
}

var analyze = function (path, warn) {
  var flag = fs.exists(path + '/package.json');
  if (flag) {
    try {
      var info = JSON.parse(fs.readFile(path + '/package.json'));
      return info;
    } catch (e) {
      if (warn != 1) {
        console.log('package.json format error\n'.red.bold);
      }
      return null;
    }
  } else {
    if (warn != 1) {
      console.log('package.json Not found\n'.red.bold);
    }
    return null;
  }
}

exports.action = action;
exports.analyze = analyze;