signin.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/signin', {
		templateUrl: 'signin/views/signin.client.view.html'
	})
}])