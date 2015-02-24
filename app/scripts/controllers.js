angular.module('app.controllers', []).controller('sortController', function($scope, $http) {
	'use strict';

	$scope.stateList = [];
	$scope.changeArray = [];
	$scope.abb = false;
	$scope.alpha = false;
	$scope.qnty = false;
	$scope.filterBy = '';
	$scope.stateArrow = true;
	$scope.abbArrow = true;
	$scope.border = null;

	function getRequest() {

		//$http.get('http://tiny-pizza-server.herokuapp.com/collections/fancy-table')
		$http.get('https://openapi.etsy.com/v2/listings/active?api_key=ypps3d905d69sq5j70eknf2t')
		.success(function(response) {

			$scope.stateList = [];
			$scope.stateList = response.results;
			// for(var i=0; i<response.length; i++) {
			// 	if(response[i].name) {
			// 		$scope.stateList.push(response[i]);
			// 	}
			// }
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				return element.title;
			});
		})
		.error(function(err) {
			console.log(err);
		});
	}
	getRequest();

	$scope.$watch('filterBy', function() {
		$scope.changeArray = _.filter($scope.stateList, function(element) {
			return element.title.toLowerCase().indexOf($scope.filterBy.toLowerCase()) >= 0; //|| 
			//element.abbreviation.toLowerCase().indexOf($scope.filterBy.toLowerCase()) >= 0;
		});
	});

	$scope.click = function(clicked) {
		if(clicked === 'title') {
			if($scope.alpha) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.alpha = false;
				return element.title;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.alpha = true;
		}
		$scope.stateArrow = !$scope.stateArrow;
		}

	};

	$scope.stateClick = function() {
		if($scope.alpha) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.alpha = false;
				return element.title;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.alpha = true;
		}
		$scope.stateArrow = !$scope.stateArrow;
	};

	$scope.abbClick = function() {
		if($scope.abb) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.abb = false;
				return element.num_favorers;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.abb = true;
		}
		$scope.abbArrow = !$scope.abbArrow;
	};

	$scope.qntyClick = function() {
		if($scope.qnty) {
			$scope.changeArray = _.sortBy($scope.stateList, function(element) {
				$scope.qnty = false;
				return element.quantity;
			});
		} else {
			$scope.changeArray.reverse();
			$scope.qnty = true;
		}
	}
});
