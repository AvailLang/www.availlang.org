var internalLinkApp = angular.module('internalLinkningApp',[]);

internalLinkApp.controller(
	"LinkCtrl",
	function ($scope, $http)
	{
		$scope.jsonURL = "/about-avail/documentation/stacks/library-documentation/internalLink.json";
		$scope.methodLinkage = {};
		$http.get($scope.jsonURL).then(function (response)
			{
				$scope.methodLinkage = response.data;
			});
		$scope.search = '';
		$scope.getMethod = function(aMethod) {
			if (aMethod in $scope.methodLinkage)
			{
				return '<code class="method"><a href="' + $scope.methodLinkage[aMethod] + '">' + aMethod + '</a></code>';
			}
			{
				return '<code class="method">' + aMethod + '</code>';
			}
		}
	});


/*internalLinkApp.directive('key', ['$compile', function($compile) {

	return function(scope, elem, attrs) {
	
	    //getting a list of space-separated property names 
	    //from the attribute.
			var these = attrs.key.split(' '),
			
			//start creating an html string.
				html = '';
				
			//append a bunch of bound values from the list.
				angular.forEach(these, function(item) {
				  if (item in scope.methodLinkage) {
		        html += '<a href="' + scope.methodLinkage[item] + '">' 
		        + item + '</a>\n\n';
				  }
				  else { 
		        html += '<code>' + item + '</code>\n\n';
				  }
					
				});
				
				//create an angular element. (this is our "view")
				var el = angular.element(html),
				
				//compile the view into a function.
					compiled = $compile(el);
					
				//append our view to the element of the directive.
				elem.append(el);
				
				//bind our view to the scope!
				//(try commenting out this line to see what happens!)
				compiled(scope);

		}		}]);


*/