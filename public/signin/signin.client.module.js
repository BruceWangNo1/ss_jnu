var signin=angular.module('signin', []);

signin.factory('dataService', function() {

  // private variable
  var error = 'hello';

  // public API
  return {
    error: error
  };
});