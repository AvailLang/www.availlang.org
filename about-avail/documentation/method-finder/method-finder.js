var internalLinkApp = angular.module('internalLinkningApp',[]);

internalLinkApp.controller(
	"LinkCtrl",
	function ($scope, $http)
	{
		$scope.jsonURL = "/about-avail/documentation/stacks/library-documentation/internalLink.json";
		$scope.methodLinkage = {};;
		$http.get($scope.jsonURL).then(function (response)
			{
				$scope.methodLinkage = response.data;
			});
		$scope.search = '';
		$scope.directLink = '';
		$scope.linkText = '';
		$scope.setLink = function(aLink)
		{
			$scope.$directLink = aLink;
		}
		$scope.resetLink = function()
		{
			$scope.$directLink = '';
		};
		$scope.getInternalLink = function(aMethod) {
			if (aMethod in $scope.methodLinkage)
			{
				$scope.directLink = $scope.methodLinkage[aMethod];
				$scope.linkText = 'Link to page';
				return '<code class="method"><a href="' + $scope.methodLinkage[aMethod] + '">"' + aMethod + '"</a></code>';
			}
			$scope.directLink = '';
			$scope.linkText = '';
			return '<code class="method">"' + aMethod + '"</code>';
		};
		$scope.getExternalLink = function(aMethod) {
			if (aMethod in $scope.methodLinkage)
			{
				$scope.directLink = $scope.methodLinkage[aMethod];
				$scope.linkText = 'Link to page';
				return '<a href="http://www.availlang.org' + $scope.methodLinkage[aMethod] + '">"' + aMethod + '"</a>';
			}
			$scope.directLink = '';
			$scope.linkText = '';
			return '"' + aMethod + '"';
		};
	});

