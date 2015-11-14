angular.module('boilerplate').controller('CustomersCtrl', function($scope) {
	$scope.app.title = 'Customers';

	$scope.customers = $scope.mock.customers;
});
