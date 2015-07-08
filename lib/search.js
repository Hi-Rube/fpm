/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 9/3/14
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var util = require('util');
var usage = require('../storage/usage');

var config = require('../storage/runtime_cache').get('fpmConfig');

var action = function (args) {
    if (args.length === 0 || args[0] === '-h' || (args[1] && args[1] != '-all')) {
        usage.searchUsage();
        return;
    }
    var moduleName = args[0];
    if (!(/^[A-Za-z0-9|-]+$/).exec(moduleName)) {
        console.log('Module not fount'.red.bold);
        return;
    }
    var host = config.fpmHost;
    if (config.registryHost) {
        host = config.registryHost;
    }
    if (host.split('http://').length === 1) {
        host = 'http://' + host;
    }
    var url = host + '/search/' + moduleName;
    var moduleInfo = http.get(url);
    try {
        moduleInfo = JSON.parse(moduleInfo.body.readAll().toString());
    } catch (e) {
        console.log('Module not fount'.red.bold);
        return;
    }
    if (args[1] === '-all') {
        moduleInfo['readme'] = 'Too long to view the website';
        var d = null;
        for (var i in (d = ['starreduser', 'userid', '_id', 'modulespath', 'downloads', 'star'])) {
            delete moduleInfo[d[i]];
        }
        console.log(util.format(moduleInfo).cyan.bold);
    } else {
        var info = moduleInfo.modulesInfo;
        var pt = new Date();
        pt.setTime(parseInt(moduleInfo.publishtime));
        console.log('Module Name         :   '.bold.yellow + util.format(info.name).bold.cyan);
        console.log('Module version      :   '.bold.yellow + util.format(info.version).bold.cyan);
        console.log('Last Publish Time   :   '.bold.yellow + (pt.toDateString() + ' ' + pt.toTimeString()).bold.cyan);
        if (info.description)
            console.log('Module description  :   '.bold.yellow + util.format(info.description).bold.cyan);
        if (info.homepage)
            console.log('Module homepage     :   '.bold.yellow + util.format(info.homepage).bold.cyan);
        if (info.repository && info.repository.url)
            console.log('Module repository   :   '.bold.yellow + util.format(info.repository.url).bold.cyan);
    }
}

exports.action = action;