/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 9/10/14
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
var usage = require('../storage/usage');
var download = require('./download');
var packaging = require('./packaging');
var runtimeCache = require('../storage/runtime_cache');
var process = require('process');

var filter = function (params) {
  return (/^[0-9a-zA-Z|-]+$/).exec(params);
}

var localInstall = function () {
  var dependencies = getDependencies('./');
  goInstall(dependencies, './', 1);
  console.log('Install Finish~'.cyan.bold);
}

var getDependencies = function (path) {
  var packageInfo = packaging.analyze(path);
  if (!packageInfo) {
    return;
  }
  var dependencies = packageInfo.dependencies;
  return dependencies;
}

var getScripts = function (path) {
  var packageInfo = packaging.analyze(path);
  if (!packageInfo) {
    return;
  }
  var scripts = packageInfo.scripts;
  return scripts;
}

var goInstall = function (dp, path, dep) {
  if (dp && dp != {}) {
    for (var d in dp) {
      var pure = runtimeCache.get('#pure');
      if (pure && runtimeCache.get((dep - 1) + '#' + d)) {
        continue;
      }
      var df = download.action([d, dp[d]], path);
      if (!df) {
        continue;
      }
      pure && runtimeCache.put(dep + '#' + d, true);
      var dependencies = getDependencies(path + './.modules/' + d + '/');
      var scripts = getScripts(path + './.modules/' + d + '/');
      if (scripts && scripts.install) {
        process.system(scripts.install);
        continue;
      } else {
        goInstall(dependencies, path + './.modules/' + d + '/', dep + 1);
      }
    }
  }
}

var globalInstall = function (args) {
  var modulename = args[1];
  if (!filter(modulename)) {
    console.log('Module Not Found'.bold.red);
    return;
  }
  if (args.indexOf('-pure') != -1) {
    runtimeCache.put('#pure', true)
  }
  var version = args[2] || "x";
  var obj = {};
  obj[modulename] = version;
  try {
    goInstall(obj, '/usr/local/lib/fib_modules/', 1);
    var packageInfo = packaging.analyze('/usr/local/lib/fib_modules/.modules/' + modulename + '/');
    var bin = packageInfo.bin;
    for (var b in bin) {
      process.system('ln -s ' + bin[b] + ' /usr/local/bin/' + b);
    }
  } catch (e) {
    console.log('Permission denied --please use sudo'.red.bold);
    return;
  }
  console.log(('\'' + modulename + '\' Install Finish~').cyan.bold);
}

var singleInstall = function (args) {
  var modulename = args[0];
  if (!filter(modulename)) {
    console.log('Module Not Found'.bold.red);
    return;
  }
  if (args.indexOf('-pure') != -1) {
    runtimeCache.put('#pure', true)
  }
  var version = args[1] || "x";
  var obj = {};
  obj[modulename] = version;
  goInstall(obj, './', 1);
  console.log(('\'' + modulename + '\' Install Finish~').cyan.bold);
}

var action = function (args) {
  if (args.length === 0 || args[0] === '-pure') {
    !args[0] || runtimeCache.put('#pure', true);
    localInstall();
    return;
  }
  if (args[0] === '-h') {
    usage.installUsage();
    return;
  }
  if (args[0] === '-g') {
    globalInstall(args);
    return;
  }
  singleInstall(args);
}

exports.action = action;