signin.controller('signinController', ['$scope', '$location', '$route', '$window',
 'Authentication', '$http', 'dataService', '$timeout',
	function($scope, $location, $route, $window, Authentication, $http, dataService, $timeout){
		$scope.authentication=Authentication;

		if($scope.authentication.user){
			$location.path('/panel');
		}
		$scope.signin=function(){
			var user={
				email: this.loginemail,
				password: this.password
			};

			console.log(user);

			$http.post('api/', user).then(function(response){
				// $timeout(function(){
				// 	(function(callback){
				// 		$window.location.reload();
				// 	}(function(){
				// 		$location.path('/panel');
				// 	}));
				// });
				$location.path('/panel');
				$window.location.reload();
				// $scope.$apply(function() {
  		// 			$location.path('/panel');
				// 	$window.location.reload();
				// });
				//$location.path('/panel');
			}, function(errMessage){
				$scope.error=errMessage.data;
				console.log($scope.error);
			});
		};
	}]);
signin.controller('signinControllerAuthentication', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.authentication = Authentication;
}]);