/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/28/14
 * Time: 1:07 AM
 * To change this template use File | Settings | File Templates.
 */
var colors = require('colors');
var fs = require('fs');
var http = require('http');
var process = require('process');
var packaging = require('./packaging');
var usage = require('../storage/usage');

var config = require('../storage/runtime_cache').get('fpmConfig');

var filter = function (path) {
  try {
    var dir = fs.readdir(path);
    for (var i = 0; i <= dir.length; i++) {
      if (i === dir.length) {
        console.log('\"package.json\" not found.\n'.red.bold + ('You can use command \"fpm packaging\"' +
        ' to create it.').cyan.bold);
        return;
      }
      if (dir[i].name === 'package.json') {
        break;
      }
    }
  } catch (e) {
    console.log(('\"' + path + '\" is not a module').red.bold);
    return;
  }
  compression(path);
}

var checkPackage = function (moduleInfo) {
  if (moduleInfo.name && moduleInfo.version) {
    return true;
  }
  console.log('\"package.json\" information error, please check \"name\" and \"version\".'.red.bold);
  return false;
}

var compression = function (path) {
  var moduleInfo = packaging.analyze(path);
  if (moduleInfo && checkPackage(moduleInfo)) {
    if (!fs.exists('./.tmp')) {
      fs.mkdir('./.tmp');
    }
    var dir = fs.readdir(path);
    var str = '';
    for (var i = 0; i < dir.length; i++) {
      if (!(/^[.].*$/).exec(dir[i].name)) {
        str += dir[i].name + ' ';
      }
    }
    console.log("fpm is packaging files ...".yellow.bold);
    process.system('tar zcvf ./.tmp/' + moduleInfo.name + '-' + moduleInfo.version + '.tar.gz ' + str);
    submit(moduleInfo);
  }
}

var readme = function () {
  var readmeInfo = '';
  if (fs.exists('./README.md')) {
    var file = fs.open('./README.md', 'r');
    var boundary = "---------------------------leon";
    readmeInfo = '\r\n'
    + 'Content-Disposition: form-data; name="readme"'
    + '\r\n\r\n'
    + file.readAll()
    + '\r\n'
    + '--' + boundary;
    file.close();
  }
  return readmeInfo;
}

var submit = function (moduleInfo) {
  var address = (config['registryHost'] ? config['registryHost'] : config['fpmHost']).split(':');
  address[1] = address[1] ? parseInt(address[1]) : 80;
  var fileName = moduleInfo.name + '-' + moduleInfo.version + '.tar.gz';
  var file = fs.open('./.tmp/' + fileName, 'r');
  var datas = file.readAll();
  var boundary = "---------------------------leon";
  var formStr = '--' + boundary
    + '\r\n'
    + 'Content-Disposition: form-data; name="username"'
    + '\r\n\r\n'
    + encodeURIComponent(config['username'])
    + '\r\n'
    + '--' + boundary
    + '\r\n'
    + 'Content-Disposition: form-data; name="moduleInfo"'
    + '\r\n\r\n'
    + JSON.stringify(packaging.analyze('./'))
    + '\r\n'
    + '--' + boundary
    + '\r\n'
    + 'Content-Disposition: form-data; name="password"'
    + '\r\n\r\n'
    + encodeURIComponent(config['password'])
    + '\r\n'
    + '--' + boundary
    + readme()
    + '\r\n'
    + 'Content-Disposition: form-data; name="fpm"; filename="' + encodeURIComponent(fileName) + '"'
    + '\r\n'
    + 'Content-Type: application/octet-stream'
    + '\r\n'
    + 'Content-Transfer-Encoding: binary'
    + '\r\n\r\n';
  var formEnd = '\r\n--' + boundary + '--\r\n';
  var request = new Buffer();
  request.write(formStr);
  request.write(datas);
  request.write(formEnd);
  var backInfo = http.post(address[0] + ':' + address[1] + '/publish/' + moduleInfo.name, request, {
    'Content-Type': 'multipart/form-data; boundary=' + boundary
  });
  switch (backInfo.status) {
    case 401:
      console.log('Error 401 Unauthorized'.red.bold);
      break;
    case 406:
      console.log('This Module\'s Version exists. Change modules\'s name or version'.red.bold);
      break;
    case 200:
      console.log('Publish Successful'.green.bold);
      break;
  }
  try {
    file.close();
    fs.unlink('./.tmp/' + fileName);
    fs.rmdir('./.tmp');
  } catch (e) {
    //TODO: deal rm file and dir error
  }
}

var auth = function () {
  if (config['username'] && config['password']) {
    return true;
  }
  console.log(('Error. No FpmAccount. please use command:\n\n\"fpm config set username <value>\"' +
  '\n\"fpm config set password <value>\"\n\nSet FpmAccount then publish modules').bold.red);
  return false;
}

var action = function (args) {
  if (args.length === 0 || args[0] === '-h') {
    usage.publishUsage();
    return;
  }
  if (!auth()) {
    return;
  }
  var modulesPath = args[0];
  if (fs.exists(modulesPath)) {
    filter(modulesPath);
    return;
  } else {
    console.log(('The module\'s path \"' + args[0] + '\" not found').red.bold);
    return;
  }
  usage.publishUsage();
}

exports.action = action;


