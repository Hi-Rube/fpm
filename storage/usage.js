/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */
var colors = require('colors');
var fpmInfo = require('../package.json');

var paintFPM = function (){
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.greenBG);
  console.log('@'.greenBG+'                                                '+'@'.greenBG);
  console.log('@'.greenBG+'    @@@@@@@     @@@@@@@          @     @        '+'@'.greenBG);
  console.log('@'.greenBG+'    @           @     @         @ @   @ @       '+'@'.greenBG);
  console.log('@'.greenBG+'    @@@@@@@     @@@@@@@        @   @ @   @      '+'@'.greenBG);
  console.log('@'.greenBG+'    @           @             @     @     @     '+'@'.greenBG);
  console.log('@'.greenBG+'    @           @            @             @    '+'@'.greenBG);
  console.log('@'.greenBG+'                                                '+'@'.greenBG);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.greenBG);
}

var fpmUsage = function (){
  var seniorCommand = ['publish', 'search', 'config', 'download', 'install', 'uninstall'];
  var normalCommand = ['packaging', 'help'];
  paintFPM();
  console.log('\nUsage: fpm <command>'.yellow.bold + '\n\n' +'where <command> is one of:'.bold.cyan);
  var str = '';
  var commandList = seniorCommand.concat(normalCommand).sort();
  for (var i = 0; i < commandList.length; i++){
    str += commandList[i] + ', ';
    if ((i+1) % 7 == 0) {
      str += '\n    ';
    }
  }
  str = str.substr(0, str.length-2) + '\n\nfpm <cmd> -h     quick help on <cmd>\n' +
    'fpm -h           display full usage info\n' +
    'fpm -v           view version\n\n' + 'fpm@' + fpmInfo.version;
  console.log('    ' + str.green.bold);
}

var packagingUsage = function(){
  console.log('\nUsage: fpm packaging'.bold.yellow);
  console.log('This command can establish standard package.json\n'.bold.cyan);
  console.log('fpm packaging -h           display usage info\n'.green.bold);
}

var configUsage = function() {
  console.log('\nUsage: fpm config <command>'.bold.yellow);
  console.log('This command can config fpm\'s default setting\n'.bold.cyan);
  console.log('where <command> is one of:'.bold.cyan);
  console.log('    set, show\n'.bold.green);
  console.log('Explain:'.yellow.bold);
  console.log('set <property> <value>          set username, set password, set registry ...more'.green.bold);
  console.log('show -all                       Check out all of config'.bold.green);
  console.log('show <propetry>                 Check out specific config\n'.bold.green);
  console.log('fpm config -h                   display usage info\n'.green.bold);
}

var publishUsage = function() {
  console.log('\nUsage: fpm publish <command>'.bold.yellow);
  console.log('This command can publish your modules to fpm-server\n'.bold.cyan);
  console.log('Explain:'.yellow.bold);
  console.log('fpm publish ./                  eg. \'cd ./module\' then \'fpm publish ./\'\n'.bold.green);
  console.log('fpm publish -h                  display usage info\n'.green.bold);
}

var searchUsage = function(){
  console.log('\nUsage: fpm search <command>'.bold.yellow);
  console.log('This command can find module\'s information you need\n'.bold.cyan);
  console.log('Explain:'.yellow.bold);
  console.log('fpm search <module\'s name>'.bold.green);
  console.log('fpm search <module\'s name> -all         show detail info'.bold.green);
  console.log('fpm search -h                           display usage info\n'.green.bold);
}

var downloadUsage = function(){
  console.log('\nUsage: fpm download <command>'.bold.yellow);
  console.log('This command can download module you need but not install\n'.bold.cyan);
  console.log('Explain:'.yellow.bold);
  console.log('fpm download <module\'s name>              download the new version'.bold.green);
  console.log('fpm download <module\'s name>  <version>   eg:fpm download fpm 1.0'.bold.green);
  console.log('fpm download -h                           display usage info\n'.green.bold);
}

var installUsage = function(){
  console.log('\nUsage: fpm install <command>'.bold.yellow);
  console.log('This command can download module and install\n'.bold.cyan);
  console.log('Explain:'.yellow.bold);
  console.log('fpm install .... -pure                   Repeat the package will not be installed'.bold.green);
  console.log('fpm install                              auto install'.bold.green);
  console.log('fpm install <module\'s name>              install the new version'.bold.green);
  console.log('fpm install <module\'s name>  <version>   eg:fpm install fpm 1.0'.bold.green);
  console.log('fpm install -g <module\'s name>           global install'.bold.green);
  console.log('fpm install -h                           display usage info\n'.green.bold);
}

exports.fmpUsage = fpmUsage;
exports.packageUsage = packagingUsage;
exports.configUsage = configUsage;
exports.publishUsage = publishUsage;
exports.searchUsage = searchUsage;
exports.downloadUsage = downloadUsage;
exports.installUsage = installUsage;