information.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/information',{
		templateUrl: 'information/views/information.client.view.html'
	});
}]);