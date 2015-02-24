angular.module('app.controllers', []).controller('sortController', function($scope, $http) {
	'use strict';

	$scope.stateList = [];
	$scope.changeArray = [];
	$scope.sort = false;
	$scope.filterBy = '';
	$scope.stateArrow = true;
	$scope.abbArrow = true;

	function getRequest() {

		$http.get('https://openapi.etsy.com/v2/listings/active?api_key=ypps3d905d69sq5j70eknf2t')
		.success(function(response) {

			$scope.stateList = [];
			$scope.stateList = response.results;
			$scope.stateList.push({ title: 'hello im a test case'});
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				return element.title.toLowerCase();
			});
		})
		.error(function(err) {
			console.log(err);
		});

	}

	getRequest();

	$scope.$watch('filterBy', function() {
		if($scope.filterBy === '') {
			$scope.changeArray = _.filter($scope.stateList, function(element) {
			return element.title.toLowerCase().indexOf($scope.filterBy.toLowerCase()) >= 0;  
		});
		}
		else {
			$scope.changeArray = _.filter($scope.stateList, function(element) {
				return element.title.toLowerCase().indexOf($scope.filterBy.toLowerCase()) >= 0; 
			});
		}
	});

	$scope.click = function(clicked) {
		if($scope.sort) {
			$scope.changeArray = _.sortBy($scope.changeArray, function(element) {
				$scope.sort = false;
				if(clicked === 'title') {
					return element[clicked].toLowerCase();
				} 
				else {
					return element[clicked];
				}
				
			});
		} 
		else {
			$scope.changeArray.reverse();
			$scope.sort = true;
		}

		$scope.stateArrow = !$scope.stateArrow;
	}
});
