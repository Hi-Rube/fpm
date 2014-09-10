/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 6:43 PM
 * To change this template use File | Settings | File Templates.
 */
var usage = require('../storage/usage');

exports.action = function(){
  usage.fmpUsage();
}