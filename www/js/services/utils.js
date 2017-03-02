angular.module('evolveLite')
	.factory('utils', function(){
		var utilsObj = {};
		utilsObj.userInfo = null;
		utilsObj.token = null;

		return utilsObj;
	});