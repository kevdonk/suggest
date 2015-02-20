angular.module('suggestionFilters', [])
//object filter adapted from Armin: http://stackoverflow.com/questions/14478106/angularjs-sorting-by-property to filter in descending order
.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return b - a;
    });
    return array;
 };
});