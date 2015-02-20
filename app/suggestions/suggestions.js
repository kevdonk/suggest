'use strict';

angular.module('suggestions', ['ngRoute', 'firebase'])
.constant('FIREBASE_URI', 'https://scorching-heat-9370.firebaseio.com/')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/suggestions', {
    templateUrl: 'suggestions/suggestions.html',
    controller: 'SuggestionsViewCtrl'
  });
}])
.controller('SuggestionsViewCtrl', ['$scope', 'SuggestionService', function($scope, SuggestionService) {
  $scope.suggestions = SuggestionService.getSuggestions();

  //categories to filter suggestions
  $scope.categories = [
    { 
      "name": "Content",
    },
    { 
      "name": "Design",
    },
    { 
      "name": "Features",
    },
    { 
      "name": "Bugs",
    },
    { 
      "name": "Misc",
    }
    ];
  
  //increate/decrease rating
  function voteUp(suggest) {
    suggest.rating += 1;
    SuggestionService.editSuggestion(suggest);

  };

  function voteDown(suggest) {
    suggest.rating -= 1;
    SuggestionService.editSuggestion(suggest);
  };

  $scope.voteUp = voteUp;
  $scope.voteDown = voteDown;

  //keep track of current category for filtering and styling
  $scope.currentCategory = null;

  function setCurrentCategory(category) {
    $scope.currentCategory = category;
    cancelCreating();
    cancelEditing();
  };

  function isCurrentCategory(category) {
    return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
  };

  $scope.setCurrentCategory = setCurrentCategory;
  $scope.isCurrentCategory = isCurrentCategory;

  //can create and edit suggestions
  $scope.isCreating = false;
  $scope.isEditing = false;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;

    resetCreateForm();
  };

  function cancelCreating() {
    $scope.isCreating = false;
  };

  function startEditing() {
    $scope.isEditing = true;
    $scope.isCreating = false;
  };

  function cancelEditing() {
    $scope.isEditing = false;
  };

  function shouldShowCreating() {
    return $scope.currentCategory && $scope.isCreating && !$scope.isEditing;
  };

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  };

  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.shouldShowEditing = shouldShowEditing;


  //clear form
  function resetCreateForm() {
    $scope.newSuggest = {
      author: '',
      email: '',
      message: ''
    }
  };

  $scope.makeSuggestion = function() {
    SuggestionService.makeSuggestion($scope.newSuggest);
    resetCreateForm();
    $scope.isCreating = false;
  };
  
  $scope.editSuggest = null;
  var setEditSuggestion = function(suggest) {
    $scope.editSuggest = suggest;
  };
  $scope.setEditSuggestion = setEditSuggestion;

  $scope.editSuggestion = function(id) {
    setEditSuggestion(id);
    SuggestionService.editSuggestion($scope.editSuggest)
    $scope.editSuggest = null;
    $scope.isEditing = false;
  };

  $scope.removeSuggestion = function(id) {
    SuggestionService.removeSuggestion(id);
  };

}])
.directive("makeForm", function() {
  return {
    restrict: "E",
    templateUrl: "suggestions/forms/make-form.html"
  };
})
.directive("editForm", function() {
  return {
    restrict: "E",
    templateUrl: "suggestions/forms/edit-form.html"
  };
})
.directive("ratePanel", function() {
  return {
    restrict: "E",
    templateUrl: "suggestions/rate-panel.html"
  };
})
.factory('SuggestionService', ['$firebase', 'FIREBASE_URI', function($firebase, FIREBASE_URI) {
  var suggestions = $firebase(new Firebase(FIREBASE_URI)).$asArray();

  //Return Suggestions
  var getSuggestions = function() {
    return suggestions;
  }
  //Make Suggestion
  var makeSuggestion = function(suggest) {
    suggest.rating = 0;
    suggest.id = new Date();
    suggestions.$add(suggest);
  };

  //Edit suggestion

  var editSuggestion = function(id) {
    suggestions.$save(id);
  };

  //Remove Suggestion
  var removeSuggestion = function(id) {
    suggestions.$remove(id);
  };

  return {
    getSuggestions: getSuggestions,
    makeSuggestion: makeSuggestion,
    editSuggestion: editSuggestion,
    removeSuggestion: removeSuggestion,
  };
}])
;