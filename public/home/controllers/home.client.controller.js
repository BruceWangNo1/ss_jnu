home.controller('homeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication){
		$scope.authentication=Authentication;

		console.log('Everything works well so far');
	}]);

home.controller('helpController', ['$scope', '$location', 'Authentication', '$anchorScroll',
	function($scope, $location, Authentication, $anchorScroll){
		$scope.scrollTo = function(id) {
      		$location.hash(id);
      		$anchorScroll();
   		}
}]);