var peopleApp = angular.module('peopleApp', []);

peopleApp.controller('PeopleListCtrl', function ($scope, $http) {
  $http.get('json').success(function(data) {
    var keys = [];
    angular.forEach(data, function(person, index) {
      if (keys.indexOf(index) === -1)
        keys.push(index);
    });

    $scope.people = {
      keys: keys,
      values: data
    };
  });

  $scope.transpose = function() {
    var keys = [];
    angular.forEach($scope.people.values, function(person) {
      angular.forEach(person, function(value, key) {
        if (keys.indexOf(key) === -1)
          keys.push(key);
      });
    });

    var result = {};
    angular.forEach(keys, function(key) {
      result[key] = {};
      angular.forEach($scope.people.values, function(person, index) {
        result[key][index] = person[key];
      });
    });
    $scope.people = {
      keys: keys,
      values: result
    };
  };

});
