'use strict';

/* Controllers */

var methodListApp = angular.module('methodListApp', []);

methodListApp.controller('MethodListCtrl', function($scope, $http) {
  $http.get('method-data-files/tuple-methods.json').success(function(data) {
    $scope.methods = data;
  });
  $scope.orderProp = 'name';
  $scope.queryBy='name';
});
