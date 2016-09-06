panel.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/panel',{
		templateUrl: 'panel/views/panel.client.view.html'
	}).
	when('/node_list', {
		templateUrl: 'panel/views/node_list.client.view.html'
	});
}]);