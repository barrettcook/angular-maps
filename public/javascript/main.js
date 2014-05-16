var app = angular.module('app', []);

app.controller('PeopleListCtrl', function ($scope, $http) {
  $scope.keys = ['First Name', 'Last Name', 'Street No.', 'Street Address', 'City', 'State']

  $http.get('json').success(function(data) {
    $scope.data = data;
  });

  $scope.transpose = function() {
    var result = [];
    angular.forEach($scope.keys, function(key, i) {
      result[i] = [];
      angular.forEach($scope.data, function(row) {
        result[i].push(row[i]);
      });
    });
    $scope.data = result;
    $scope.transposed = !$scope.transposed;
  };

  // TODO: Pass in 'google' global as a dependency
  var geocoder = new google.maps.Geocoder();
  var mapOptions = {
    center: new google.maps.LatLng(37.665875,-122.3982572),
    zoom: 12
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  $scope.map = function() {
    var address = [];
    if (this.transposed) {
      for (var i = 2; i < $scope.keys.length; i++) {
        address.push($scope.data[i][this.$index]);
      }
    } else {
      address = this.$parent.row.slice(2);
    }
    address = address.join(' ');

    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        console.log("Geocode failed: " + status);
      }
    });
  };
});
