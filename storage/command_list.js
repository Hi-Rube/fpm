/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 2:51 PM
 * To change this template use File | Settings | File Templates.
 */
var commandList = [];

exports.add = function add(commandEntity){
  commandList.push(commandEntity);
}

exports.remove = function remove(){
  commandList.shift();
}

exports.entity = function entity() {
  var commandEntity = {
    "command": ""
  }
  return commandEntity;
}