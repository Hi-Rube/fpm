/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 8/27/14
 * Time: 2:59 PM
 * To change this template use File | Settings | File Templates.
 */
var collection = require("collection");
var runtimeCache = new collection.Map();

exports.put = function put(key, value) {
  runtimeCache.put(key, value);
}

exports.get = function get(key) {
  if (runtimeCache.has(key)) {
    return runtimeCache.get(key);
  }
  return null;
}