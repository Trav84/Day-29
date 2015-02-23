angular.module('app.controllers', []).controller('sortController', function($scope, $http) {
	'use strict';

	$scope.stateList = [];
	$scope.changeArray = [];
	$scope.abb = true;
	$scope.alpha = true;
	$scope.filterBy = '';
	$scope.stateArrow = true;
	$scope.abbArrow = true;

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
		if($scope.alpha) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.alpha = true;
				return element.name + element.abbreviation;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.alpha = false;
		}
		$scope.stateArrow = !$scope.stateArrow;

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
		$scope.abbArrow = !$scope.abbArrow;
	};

	$scope.$watch('filterBy', function() {
		$scope.changeArray = _.filter($scope.stateList, function(element) {
			return element.name.indexOf($scope.filterBy) >= 0 ||  element.abbreviation.indexOf($scope.filterBy) >= 0;
		});
	});
});
