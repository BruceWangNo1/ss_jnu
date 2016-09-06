var mainApplicationModuleName='ss';

var mainApplicationModule=angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute',
 'signin', 'home', 'userclient', 'panel', 'signup', 'reset_password']);

mainApplicationModule.config(['$locationProvider', function($locationProvider){
	console.log('I do not wanna set hash prefix!');
}]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});