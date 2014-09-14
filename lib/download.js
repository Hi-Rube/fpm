/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 9/4/14
 * Time: 11:08 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var fs = require('fs');
var process = require('process');
var usage = require('../storage/usage');

var config = require('../storage/runtime_cache').get('fpmConfig');

var filter = function (params) {
  return (/^[0-9a-zA-Z|-]+$/).exec(params);
}

var action = function (args, path) {
  if (!path) {
    path = './';
  }
  if (args.length === 0 || args[0] === '-h') {
    usage.downloadUsage();
    return;
  }
  if (!filter(args[0])) {
    console.log(('Not found this module \"' + args[0] + "\"\n").red.bold);
    return;
  }
  if (config.fpmHost.split('http://').length === 1) {
    config.fpmHost = 'http://' + config.fpmHost;
  }
  args[1] = args[1] || '';
  if (fs.exists(path + './.modules/' + args[0])) {
    console.log((args[0] + ' Modules is existed reDownload ...').yellow.bold);
    process.system('rm -r ' + path + './.modules/' + args[0]);
  }
  console.log(('Begin to download \"' + args[0] + '\"').yellow.bold);
  console.log('Downloading ...'.yellow.bold);
  var m = http.get(config.fpmHost + '/download/' + args[0] + '?v=' + args[1]);
  var module = m.body.readAll();
  if (module) {
    if (!fs.exists(path + './.tmp')) {
      fs.mkdir(path + './.tmp');
    }
    if (!fs.exists(path + './.modules')) {
      fs.mkdir(path + './.modules');
    }
    fs.mkdir(path + './.modules/' + args[0]);
    var file = fs.open(path + './.tmp/~' + args[0] + '.tar.gz', 'w');
    file.write(module);
    file.close();
    process.system('tar zxf '+ path +'./.tmp/~' + args[0] + '.tar.gz -C ' + path + './.modules/' + args[0]);
    try {
      fs.unlink(path + './.tmp/~' + args[0] + '.tar.gz');
      fs.rmdir(path + './.tmp');
    } catch (e) {
      //TODO: deal rm file and dir error
    }
    console.log(('Download \"' + args[0] + '\" successful').yellow.bold);
    if (args[1] && parseInt(m.cookies[1]['value']) === 1) {
      console.log((args[1] + ' Version not found but download the new version \"' + m.cookies[0]['value'] + '\"').bold.yellow);
    }
    console.log((args[0] + '@' + m.cookies[0]['value'] + '\n').bold.green);
    return true;
  } else {
    console.log(('Not found this module \"' + args[0] + "\"\n").red.bold);
  }
}

exports.action = action;