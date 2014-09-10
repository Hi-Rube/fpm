/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 9/3/14
 * Time: 4:58 PM
 * To change this template use File | Settings | File Templates.
 */
var process = require('process');
var packaging = require('./packaging');
var action = function (command) {
  var packageInfo = packaging.analyze('./');
  if (!packageInfo) {
    return false;
  }
  var scripts = packageInfo.scripts;
  for (var script in scripts) {
    if (script === command) {
      process.system(scripts[script]);
      return true;
    }
  }
  return false;
}

exports.action = action;