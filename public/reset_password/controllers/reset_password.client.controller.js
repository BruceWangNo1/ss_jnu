reset_password.controller('reset_passwordController', ['$scope', '$location', '$route', '$window',
 'Authentication', '$http', '$timeout',
	function($scope, $location, $route, $window, Authentication, $http, $timeout){
		$scope.authentication=Authentication;

		$scope.reset_password=function(){
			var user={
				email: this.loginemail,
				username: this.username
			};
			$scope.response = null;
			$scope.error = null;
			$scope.notice = "There may be some delay to send you email. So you may need to wait for about half a minute."

			console.log(user);

			$http.post('api/reset_password', user).then(function(response){
				console.log('response '+ (typeof response));
				$scope.response = 'Password reset token has been sent to your email. Please check.';
				$scope.notice = null;
				$timeout($location.path('/reset_password_with_token'),3000);
			}, function(errMessage){
				$scope.error = errMessage.data;
				console.log($scope.error);
				$scope.notice = null;
			});
		};
	}]);
reset_password.controller('reset_password_with_tokenController', ['$scope', '$location', '$route', '$window',
	'Authentication', '$http', '$timeout', function($scope, $location, $route, $window, Authentication,
		$http, $timeout){
		$scope.authentication = Authentication;

		$scope.reset_password_with_token = function(){
			$scope.notice = "There may be some delay. So you may need to wait for a few seconds."
			
			if($scope.password != $scope.password_confirmation){
				$scope.error = "Passwords do not match, please input again.";
			}
			else if($scope.password.length < 5 || $scope.password.length > 10) {
				$scope.error = "Password length should be within 5 and 10.";
			}
			else{
				var user={
					email: $scope.loginemail,
					token: $scope.token,
					password: $scope.password
				};
				$http.post('api/reset_password_with_token', user).then(function(response){
					console.log('response '+ (typeof response));
					$scope.response = 'Congratulations!  Password Reset Successful.';
					$scope.notice = null;
					$location.path('/panel');
					$window.location.reload();
					//$timeout($location.path('/panel'),3000);
				}, function(errMessage){
					$scope.error = errMessage.data;
					console.log($scope.error);
					$scope.notice = null;
				});
			}
		}
	}])