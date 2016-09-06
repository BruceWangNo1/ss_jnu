signup.controller('signupController', ['$scope', '$location', '$window', '$http',
	function($scope, $location, $window, $http){
		$scope.signup=function(){
			console.log('password ' + $scope.password + " " + $scope.password_confirmation);
			if($scope.password != $scope.password_confirmation){
				$scope.error = "Passwords do not match, please input again.";
			}
			else if($scope.password.length < 5 || $scope.password.length > 10) {
				$scope.error = "Password length should be within 5 and 10.";
			}
			else{
				var user={
					email: $scope.email,
					username: $scope.username,
					password: $scope.password
				};

				$http.post('api/signup/', user).then(function(response){
					$location.path('/');
					$window.location.reload();
				}, function(errMessage){
					$scope.error=errMessage.data;
				});
			}
		};
	}]);