signup.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/signup', {
		templateUrl: 'signup/views/signup.client.view.html'
	});
}]);
