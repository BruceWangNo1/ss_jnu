signin.controller('signinController', ['$scope', '$location', '$route', '$window',
 'Authentication', '$http', 'dataService',
	function($scope, $location, $route, $window, Authentication, $http, dataService){
		$scope.authentication=Authentication;

		$scope.signin=function(){
			var user={
				email: this.loginemail,
				password: this.password
			};

			console.log(user);

			$http.post('api/', user).then(function(response){
				$location.path('/panel');
				$window.location.reload();
			}, function(errMessage){
				$scope.error=errMessage.data;
				console.log($scope.error);
			});
		};
	}]);
signin.controller('signinControllerAuthentication', ['$scope', 'Authentication', function($scope, Authentication){
	$scope.authentication = Authentication;
}]);