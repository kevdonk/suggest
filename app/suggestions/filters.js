angular.module('suggestionFilters', [])
//toArray filter from github user slundberg   https://github.com/angular/angular.js/issues/1286
.filter('toArray', function() { return function(obj) {
    if (!(obj instanceof Object)) return obj;
    return _.map(obj, function(val, key) {
        return Object.defineProperty(val, '$key', {__proto__: null, value: key});
    });
}})
.filter('reverse', function() {
  return function(list) {
    return list.slice().reverse();
  };
});
