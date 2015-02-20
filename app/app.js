'use strict';

// Declare app level module which depends on views, and components
angular.module('suggest', [
  'ngRoute',
  'suggestionFilters',
  'suggestions',
  'myApp.view2',
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/suggestions'});
}])
;
