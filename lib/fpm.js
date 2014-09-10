/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/25/14
 * Time: 12:51 PM
 * To change this template use File | Settings | File Templates.
 */
var colors = require('colors');

var runtimeCache = require('../storage/runtime_cache');
var fpmInfo = require('../package.json');
var usage = require('../storage/usage');
var packaging = require('./packaging');
var config = require('./config');
var scriptCommand = require('./script_command');

var seniorCommand = ['publish', 'search', 'config', 'download', 'install', 'uninstall'];
var normalCommand = ['packaging', 'help'];
var paramCommand = ['-h', '-v'];

exports.action = function action(args) {
  runtimeCache.put('binPath', args[0]);
  runtimeCache.put('scriptPath', args[1]);
  if (args.length === 2) {
    usage.fmpUsage();
  } else {
    var arg = args[2];
    if (scriptCommand.action(arg)) {
      return;
    }
    if (seniorCommand.indexOf(arg) != -1) {
      config.analyze();
      args.splice(0, 3);
      var m = require('./' + arg);
      m.action(args);
      return;
    }
    if (normalCommand.indexOf(arg) != -1) {
      var m = require('./' + arg);
      args.splice(0, 3);
      m.action(args);
      return;
    }
    if (paramCommand.indexOf(arg) != -1) {
      switch (arg) {
        case '-v':
          console.log('fpm@' + fpmInfo.version);
          break;
        case '-h':
          usage.fmpUsage();
          break;
      }
      return;
    }
    usage.fmpUsage();
  }
}
