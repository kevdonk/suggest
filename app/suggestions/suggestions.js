'use strict';

angular.module('suggestions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/suggestions', {
    templateUrl: 'suggestions/suggestions.html',
    controller: 'SuggestionsViewCtrl'
  });
}])
.controller('SuggestionsViewCtrl', ['$scope', function($scope) {
  //suggestions - later will be populated by backend
  $scope.suggestions = [
    {
      "id": 0,
      "author": "Kevin",
      "email": "kevin@mayoind.com",
      "message": "You should add firebase for the backend!",
      "category": "Features",
      "rating": 55
    },
    {
      "id": 1,
      "author": "Donk",
      "email": "notkevdonk@gmail.com",
      "message": "This site is ugly - make it look nicer...",
      "category": "Design",
      "rating": 50
    },
    {
      "id": 2,
      "author": "qgyh2",
      "email": "fake@email.com",
      "message": "test post please ignore",
      "category": "Misc",
      "rating": 59
    }
  ];
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
    var index = _.findIndex($scope.suggestions, function(s) {
      return s.id == suggest.id;
    });
    $scope.suggestions[index].rating += 1;
  }

  function voteDown(suggest) {
    var index = _.findIndex($scope.suggestions, function(s) {
      return s.id == suggest.id;
    });
    $scope.suggestions[index].rating -= 1;
  }

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
  }

  function cancelCreating() {
    $scope.isCreating = false;
  }

  function startEditing() {
    $scope.isEditing = true;
    $scope.isCreating = false;
  }

  function cancelEditing() {
    $scope.isEditing = false;
  }

  function shouldShowCreating() {
    return $scope.currentCategory && $scope.isCreating && !$scope.isEditing;
  }

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  }

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
  }

  //Make Suggestion
  function makeSuggestion(suggest) {
    suggest.rating = 0;
    suggest.id = new Date();
    $scope.suggestions.push(suggest);
    resetCreateForm();
    $scope.isCreating = false;
  }

  $scope.makeSuggestion = makeSuggestion;

  //Edit suggestion
  $scope.editSuggest = null;

  function setEditSuggestion(suggest) {
    $scope.editSuggest = angular.copy(suggest);
  }

  function editSuggestion(suggest) {
    var index = _.findIndex($scope.suggestions, function(s) {
      return s.id == suggest.id;
    });
    $scope.suggestions[index] = suggest;
    $scope.editSuggest = null;
    $scope.isEditing = false;
  }

  $scope.setEditSuggestion = setEditSuggestion;
  $scope.editSuggestion = editSuggestion;

  //Remove Suggestion
  function removeSuggestion(suggest) {
    $scope.suggestions = _.without($scope.suggestions, suggest);
  }
  $scope.removeSuggestion = removeSuggestion;


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
;