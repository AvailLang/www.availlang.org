'use strict';

/* Controllers */

var methodListApp = angular.module('methodListApp', []);

methodListApp.controller('MethodListCtrl', function($scope, $http) {
  $http.get('method-data-files/methods.json').success(function(data) {
    $scope.methods = data;
  });
  $scope.orderProp = 'name';
  $scope.queryBy='name';
});

var categoryListApp = angular.module('categoryListApp', []);

categoryListApp.controller('CategoryListCtrl', function($scope, $http) {
  $http.get('category-data-files/categories.json').success(function(data) {
    $scope.categories = data;
  });
  $scope.orderProp = 'name';
  $scope.queryBy='name';
});

/*'use strict';

 Controllers 

var methodListApp = angular.module('methodListApp', []);

methodListApp.controller('MethodListCtrl', function($scope, $http) {
  $http.get('method-data-files/tuple-methods.json').success(function(data) {
    $scope.methods = data;
  });
  $scope.orderProp = 'name';
  $scope.queryBy='name';
});*/