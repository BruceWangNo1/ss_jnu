panel.controller('panelController', ['$scope', '$routeParams', '$location', '$http', 'Authentication',
	function($scope, $routeParams, $location, $http, Authentication){
		$scope.authentication=Authentication;
		$scope.test = "test";

		$scope.init = function(){
			$http.get('/user_center').success(function(data, status){
				console.log(data);
				$scope.entireTraffic = (data.transfer_enable/(1024*1024)).toFixed(2);
				$scope.usedTraffic = (data.d/(1024*1024)).toFixed(2);
				$scope.availableTraffic = $scope.entireTraffic - $scope.usedTraffic;
				$scope.ip = 
				$scope.portNumber = data.port;
				$scope.password = data.passwd;
				$scope.encryptionMethod = data.method;
				$scope.lastTimeUsed = new Date(data.t * 1000);
				console.log($scope.entireTraffic);
			});
		};
}]);
panel.controller('node_listController', ['$scope', '$routeParams', '$location', '$http', 'Authentication',
	function($scope, $routeParams, $location, $http, Authentication){
		$scope.authentication = Authentication;

		$scope.init = function(){
			$http.get('/node_list').success(function(data, status){
				$scope.data = data;
				console.log(data);
			});
		};
	}]);
