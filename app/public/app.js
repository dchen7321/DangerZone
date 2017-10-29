(function() {

  'use strict';

  var app = angular.module('dangerZoneApp', ['ngResource']);

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.google.com/**']);
  });

  app.controller('DangerZoneController', function($scope, $resource, $http) {

    var Crimes = $resource('/crimes');
    $scope.inputType = 'auto';

    $scope.loaded = false;

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = parseFloat(pos.coords.latitude.toFixed(4));
      $scope.long = parseFloat(pos.coords.longitude.toFixed(4));
      $scope.search($scope.lat, $scope.long, false);
    }, function() {}, {});

    $scope.search = function(lat, long, refresh) {
      $scope.mapLink = 'https://maps.google.com/maps?q=' + lat + ',' + long + '&output=embed';
      if (refresh) {
        var iframe = document.getElementById('map');
        iframe.src = iframe.src;
      }
      $scope.crimes = Crimes.query({ lat: lat, long: long}, function() {
        $scope.loaded = true;
        $scope.crimePercentage = ($scope.crimes.length / 48.41).toFixed(2);
        $scope.crimes = $scope.crimes.slice(0, 10);
      });
      $http.get('https://apis.solarialabs.com/shine/v1/total-home-scores/reports', {
        params: {
          apikey: '7q4owDuo4dGQLG796GGkDIP3eeCzS5vo',
          lat: lat,
          lon: long
        }}).then(function(response) {
        $scope.safetyRating = response.data.totalHomeScores.safety.value.toFixed(2);
      });
    };

    $scope.search2 = function(input, refresh) {
      var geocoder = new google.maps.Geocoder();
      input += ", Boston, MA";
      geocoder.geocode({'address': input}, function(results, status) {
        if (status === 'OK') {
          $scope.search(results[0].geometry.location.lat(), results[0].geometry.location.lng(), true);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      })
    };
  });

})();
