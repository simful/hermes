angular.module('boilerplate').controller('NewReservationCtrl', function($scope) {
	$scope.app.title = 'New Reservation';

	$scope.reservation = {};
	$scope.reservation.rooms = [];

	$scope.customers = $scope.mock.customers;
	$scope.customer = {};

	$scope.addRoom = function() {
		$scope.reservation.rooms.push({
			room_id: 1,
			rate_id: 1,
			fromDate: moment(),
			toDate: moment().add(1, 'days')
		});
	};

	function getRate(id) {
		return objectFindByKey($scope.mock.rates, 'id', id);
	}

	function getRoom(id) {
		return objectFindByKey($scope.mock.rooms, 'id', id);
	}

	$scope.tax = 0.1;
	$scope.grandTotal = 0;
	$scope.total = 0;

	$scope.getSubtotal = function(room) {
		var roomType = getRoom(room.room_id).type;
		var price = getRate(room.rate_id).prices[roomType];
		var subtotal = price * moment(room.toDate).diff(moment(room.fromDate), 'days');
		return subtotal;
	};

	$scope.getTotal = function(rooms) {
		var total = 0;
		for (var i = 0; i < rooms.length; i++)
		{
			total += $scope.getSubtotal(rooms[i]);
		}
		$scope.total = total;
		$scope.grandTotal = total + (total * $scope.tax);
		return total;
	};

	$scope.saveCustomer = function() {
		var newCustomer = {
			id: $scope.customers.length,
			name: $scope.customer.name
		};

		$scope.customers.push(newCustomer);

		$scope.customer = {};
		$scope.reservation.customer_id = newCustomer.id;
	};

	$scope.saveReservation = function() {

	};
});
