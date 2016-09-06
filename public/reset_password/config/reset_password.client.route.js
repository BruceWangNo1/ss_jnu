reset_password.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/reset_password', {
		templateUrl: 'reset_password/views/reset_password.client.view.html'
	}).
	when('/reset_password_with_token', {
		templateUrl: 'reset_password/views/reset_password_with_token.client.view.html'
	});
}]);