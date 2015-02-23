angular.module('app.controllers', []).controller('sortController', function($scope, $http) {
	'use strict';

	$scope.stateList = [];
	$scope.changeArray = [];
	$scope.abb = true;
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
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				return element.name + element.abbreviation;
			});
		})
		.error(function(err) {
			console.log(err);
		});
	}
	getRequest();

	$scope.stateClick = function() {
		$scope.changeArray.reverse();
	};

	$scope.abbClick = function() {
		if($scope.abb) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.abb = false;
				return element.abbreviation + element.name;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.abb = true;
		}
	};

	$scope.$watch('filterBy', function() {
		$scope.changeArray.name
		$scope.changeArray = _.filter($scope.stateList, function(element) {
			return element.name.indexOf($scope.filterBy) >= 0;
		});
		// $scope.changeArray = _.filter($scope.stateList, function(element) {
		// 	return element.abbreviation.indexOf($scope.filterBy) >= 0;
		// });
	});
});
