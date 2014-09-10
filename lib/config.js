/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
var colors = require('colors');
var fs = require('fs');
var util = require('util');
var process = require('process');
var config = require('../storage/default_config');
var runtimeCache = require('../storage/runtime_cache');
var usage = require('../storage/usage');

var normalCommand = ['set', 'show'];
var paramCommand = ['-h'];

var setConfig = function (property, value){
  var $HOME = process.popen('env|grep ^HOME=').readLine().slice(5);
  var ucPath = $HOME + '/.fpm/user_config.json';
  var config = runtimeCache.get('fpmConfig');
  config[property] = value;
  if (fs.exists(ucPath)){
    var file = fs.open(ucPath, 'w');
    file.write(util.format(config));
    file.close();
    console.log('Configuring Success'.bold.green);
    return;
  }
  if (!fs.exists($HOME + '/.fpm')){
    fs.mkdir($HOME + '/.fpm');
  }
  fs.writeFile(ucPath, util.format(config));
  console.log('Configuring Success'.bold.green);
}

var showConfig = function(property){
  switch (property) {
    case '-all' : console.log(util.format(config).bold.green); break;
    default : if (config[property] != null) {
      console.log(config[property].bold.green);
    } else {
      console.log('Property not found'.red.bold);
    }
  }
}

var action = function(args){
  if (args.length === 0 || args[0] === '-h'){
    usage.configUsage();
    return;
  }
  if (normalCommand.indexOf(args[0]) != -1){
    switch (args[0]){
      case 'set':
        if (args.length >= 2) {
          var property = args[1];
          var value = args[2] ? args[2] : '';
          setConfig(property, value);
        } else {
          usage.configUsage();
        }
        break;
      case 'show':
        if (args.length >= 2) {
          showConfig(args[1]);
        } else {
          usage.configUsage();
        }
        break;
    }
    return;
  }
  usage.configUsage();
}

var analyze = function(){
  var $HOME = process.popen('env|grep ^HOME=').readLine().slice(5);
  var ucPath = $HOME+'/.fpm/user_config.json';
  if (fs.exists(ucPath)){
    config = JSON.parse(fs.readFile(ucPath));
  }
  runtimeCache.put('fpmConfig', config);
}

exports.action = action;
exports.analyze = analyze;