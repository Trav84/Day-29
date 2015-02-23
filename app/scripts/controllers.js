angular.module('app.controllers', []).controller('sortController', function($scope, $http, $watch) {
	'use strict';

	$scope.stateList = [];
	$scope.changeArray = [];
	$scope.alpa = true;
	$scope.filterBy = '';

	function getRequest() {

		$http.get('http://tiny-pizza-server.herokuapp.com/collections/fancy-table')
		.success(function(response) {

			$scope.stateList = [];

			for(var i=0; i<response.length; i++) {
				if(response[i].name) {
					$scope.stateList.push(response[i]);
				}
			}
			$scope.changeArray = $scope.stateList.reverse();
		})
		.error(function(err) {
			console.log(err);
		});
	}
	getRequest();

	$scope.stateClick = function() {

		$scope.changeArray.reverse();
		
		console.log($scope.changeArray);
		console.log('click');
	}

	$scope.$watch('filterBy', function() {
		$scope.changeArray = _.filter($scope.stateList, function() {
			return element.name.indexOf($scope.filterBy) < 0;
		});
	});
});
