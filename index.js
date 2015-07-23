// Generated by LiveScript 1.3.1
(function(){
  var p, STRIP_COMMENTS, ARGUMENT_NAMES, params, services, register, transform, load, clone, object, xonom, x$, toString$ = {}.toString;
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
  load = function(any){
    if (toString$.call(any).slice(8, -1) === 'Function') {
      any.apply(this, p.map(transform)(
      p.each(register)(
      params(
      any))));
    }
    if (toString$.call(any).slice(8, -1) === 'String') {
      return load(
      require(
      any));
    } else {
      return any;
    }
  };
  clone = function(obj, copy){
    var attr, results$ = [];
    for (attr in obj) {
      results$.push(copy[attr] = obj[attr]);
    }
    return results$;
  };
  object = function(name, object){
    var pub;
    pub = transform(
    register(
    name));
    return clone(object, pub);
  };
  xonom = {};
  x$ = xonom;
  x$.require = function(path){
    return load(
    require(
    path));
  };
  x$.run = function(f){
    load(f);
    return xonom;
  };
  x$.service = function(name, func){
    object(name, load(
    func));
    return xonom;
  };
  x$.object = function(name, o){
    object(name, o);
    return xonom;
  };
  object('$xonom', xonom);
  module.exports = xonom;
}).call(this);
