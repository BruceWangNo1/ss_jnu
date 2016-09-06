information.controller('InformationController', ['$scope', '$routeParams', '$location', '$http', 'Authentication',
	function($scope, $routeParams, $location, $http, Authentication){
		$scope.authentication=Authentication;

		$scope.data={};
		$scope.whichData=function(index){
			console.log('data length: ' + $scope.data.length);
			if($scope.data.length>1){
				$scope.count=$scope.data[index].count;
				$scope.sid=$scope.data[index].SID;
				$scope.name=$scope.data[index].Name;
				$scope.major=$scope.data[index].Major;
				$scope.phone=$scope.data[index].Phone;
				$scope.address=$scope.data[index].Address;
				$scope.mac=$scope.data[index].MAC;
				$scope.appliedTime=$scope.data[index].AppliedTime;
				$scope.expireTime=$scope.data[index].ExpireTime;

				$scope.gender=$scope.data[index].Gender;
				$scope.height=$scope.data[index].Height;
				$scope.weight=$scope.data[index].Weight;
				$scope.fhl=$scope.data[index].FHL;
				$scope.fiftymeter=$scope.data[index].FiftyMeter;
				$scope.zwtqq=$scope.data[index].ZWTQQ;
				$scope.ytxsorywqz=$scope.data[index].YTXSorYWQZ;
				$scope.onekoreighthundredmeter=$scope.data[index].OneKOrEightHundredMeter;
				$scope.ldty=$scope.data[index].LDTY;

				$scope.gpa=$scope.data[index].GPA;
				$scope.total=$scope.data[index].TOTAL;
				$scope.creditEarned=$scope.data[index].CreditEarned;
				$scope.rank=$scope.data[index].rank;
				$scope.nos=$scope.data[index].nos;
			}
		}
		$scope.clear=function(){
			$scope.input_sid=null,
			$scope.input_phone=null,
			$scope.input_name=null
		}
		$scope.search=function(){
			console.log('searching begins');
			var postData={
				sid:this.input_sid || null,
				name: this.input_name || null,
				phone: this.input_phone || null
            };
			$http.post('/query', postData).success(function(data, status){
				$scope.data=data;
				console.log(data);
				console.log(typeof(data));
				console.log('status '+status);
				$scope.count=data[0].count;
				$scope.sid=data[0].SID;
				$scope.name=data[0].Name;
				$scope.major=data[0].Major;
				$scope.phone=data[0].Phone;
				$scope.address=data[0].Address;
				$scope.mac=data[0].MAC;
				$scope.appliedTime=data[0].AppliedTime;
				$scope.expireTime=data[0].ExpireTime;

				$scope.gender=data[0].Gender;
				$scope.height=data[0].Height;
				$scope.weight=data[0].Weight;
				$scope.fhl=data[0].FHL;
				$scope.fiftymeter=data[0].FiftyMeter;
				$scope.zwtqq=data[0].ZWTQQ;
				$scope.ytxsorywqz=data[0].YTXSorYWQZ;
				$scope.onekoreighthundredmeter=data[0].OneKOrEightHundredMeter;
				$scope.ldty=data[0].LDTY;

				$scope.gpa=data[0].GPA;
				$scope.total=data[0].TOTAL;
				$scope.creditEarned=data[0].CreditEarned;
				$scope.rank=data[0].rank;
				$scope.nos=data[0].nos;
		});
		}
	}]);
