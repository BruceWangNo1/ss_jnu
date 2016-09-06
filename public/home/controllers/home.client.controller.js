home.controller('homeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication){
		$scope.authentication=Authentication;

		console.log('Everything works well so far');
	}]);