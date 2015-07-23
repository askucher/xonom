// Generated by LiveScript 1.3.1
(function(){
  var p, STRIP_COMMENTS, ARGUMENT_NAMES, params, services, register, transform, load, object, xonom;
  p = require('prelude-ls');
  STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  ARGUMENT_NAMES = /([^\s,]+)/g;
  params = function(func){
    var fnStr, result;
    fnStr = func.toString().replace(STRIP_COMMENTS, '');
    result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
      return [];
    } else {
      return result;
    }
  };
  services = [];
  register = function(name){
    if (services.indexOf(name) > -1) {
      return;
    }
    services.push([name, {}]);
    return name;
  };
  transform = function(name){
    return function(it){
      return it[1];
    }(
    p.find(function(it){
      return it[0] === name;
    })(
    services));
  };
  load = function(func){
    return func.apply(this, p.map(transform)(
    p.each(register)(
    params(
    func))));
  };
  object = function(name, object){
    var pub, item, results$ = [];
    pub = transform(
    register(
    name));
    for (item in object) {
      if (object.hasOwnProperty(item)) {
        results$.push(pub[item] = object[item]);
      }
    }
    return results$;
  };
  xonom = {
    func: load,
    file: function(path){
      return load(
      require(
      path));
    },
    service: function(name, func){
      return object(name, load(
      func));
    },
    object: object
  };
  object('$xonom', xonom);
  module.exports = xonom;
}).call(this);
