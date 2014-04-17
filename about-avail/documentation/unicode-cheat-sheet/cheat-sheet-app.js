var cheatSheetApp = angular.module("cheatSheetApp", []);
cheatSheetApp.controller(
	"CheatSheetController",
	function ($scope, $http)
	{
		$scope.jsonURL = "./symbolicCodePoints.json";
		$scope.symbolicCharacterInfo = [];
		$http.get($scope.jsonURL).then(function (response)
			{
				$scope.symbolicCharacterInfo = response.data;
			});
	});
