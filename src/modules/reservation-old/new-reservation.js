angular.module('boilerplate').controller('NewReservationCtrlz', function($scope) {
	$scope.app.title = 'New Reservation';

	$scope.onNewCustomer = function(data) {
		console.log(data);
	};

	$scope.reservation = {
		fromDate: moment(),
		toDate: moment().add(1, 'days'),
		room_rate: 1
	};

	$scope.onDurationChange = function(val) {
		$scope.reservation.toDate = moment($scope.reservation.fromDate).add(val, 'days');
		$scope.calculateTotal();
	};

	$scope.onToDateChange = function(val) {
		$scope.reservation.duration = moment($scope.reservation.toDate).diff($scope.reservation.fromDate, 'days');
	};

	$scope.getRoomRate = function(room) {
		return $scope.mock.rates[$scope.reservation.room_rate].prices[room.type];
	};

	$scope.calculateTotal = function() {
		$total = 0;
		for (var i = 0; i < $scope.mock.rooms.length; i++)
		{
			if ($scope.mock.rooms[i].selected)
			{
				$total += $scope.getRoomRate($scope.mock.rooms[i]) * $scope.reservation.duration;
			}
		}

		$scope.total = $total;
	};

	$scope.total = 0;

	$scope.onToDateChange();
});
