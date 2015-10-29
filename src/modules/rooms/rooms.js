angular.module('hermes.rooms', ['gantt.sortable',
    'gantt.movable',
    'gantt.drawtask',
    'gantt.tooltips',
    'gantt.bounds',
    'gantt.progress',
    'gantt.table',
    'gantt.groups',
    'gantt.overlap',
    'gantt.resizeSensor'])

.controller('RoomsCtrl', function($scope, $modal, $popover) {
    $scope.app.title = "Rooms";

    $scope.data = [];
	$scope.options = {
		fromDate: moment().subtract(1, 'weeks'),
		toDate: moment().add(1, 'months'),
		sideMode: 'Table',
        canDraw: true,
        columnMagnet: 'day',
        currentDate: 'line'
	};

    var newReservation = $modal({
        scope: $scope,
        templateUrl: '/src/views/new-reservation.html',
        show: false
    });

    var reservationDetails;

    $scope.showNewReservation = function() {
        newReservation.$promise.then(newReservation.show);
    }

    $scope.prevWeek = function() {
        $scope.options.fromDate = moment($scope.options.fromDate).subtract(1, 'weeks');
        $scope.options.toDate = moment($scope.options.toDate).subtract(1, 'weeks');
    };

    $scope.nextWeek = function() {
        $scope.options.fromDate = moment($scope.options.fromDate).add(1, 'weeks');
        $scope.options.toDate = moment($scope.options.toDate).add(1, 'weeks');
    };

    $scope.drawTaskFactory = function() {
        return {
            name: 'New Checkin',
            color: '#2ab0ed'
        };
    };

	$scope.api = function(api) {
        $scope.live = {};
        $scope.api = api;

        api.directives.on.new($scope, function(directiveName, directiveScope, element) {
            if (directiveName === 'ganttTask') {
                reservationDetails = $popover(element, {title: directiveScope.task.model.name, contentTemplate: '/src/views/reservation-details.html', trigger: 'click', autoClose: true});
                reservationDetails.$promise.then(reservationDetails.toggle);

                element.bind('click', function(event) {
                    event.stopPropagation();
                    console.log('Task Model:');
                    console.log(directiveScope.task.model);
                });
                element.bind('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    $scope.live.row = directiveScope.task.row.model;
                    if (directiveScope.task.originalModel !== undefined) {
                        $scope.live.task = directiveScope.task.originalModel;
                    } else {
                        $scope.live.task = directiveScope.task.model;
                    }
                    $scope.$digest();
                });
            } else if (directiveName === 'ganttRow') {
                element.bind('click', function(event) {
                    event.stopPropagation();
                    //console.log(event);
                });
                element.bind('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    $scope.live.row = directiveScope.row.model;
                    $scope.$digest();
                });
            } else if (directiveName === 'ganttRowLabel') {
                element.bind('click', function() {
                    logRowEvent('row-label-click', directiveScope.row);
                });
                element.bind('mousedown touchstart', function() {
                    $scope.live.row = directiveScope.row.model;
                    $scope.$digest();
                });
            }
        });

        api.tasks.on.add($scope, function(e) {

        });

        api.tasks.on.change($scope, function(e) {
            var task = e.model;

            console.log(e.model.from.toString() + ' ' + e.model.to.toString());
        });

        api.tasks.on.rowChange($scope, function() {});
        api.tasks.on.remove($scope, function() {});
    };

    for (i = 201; i < 220; i++)
		$scope.data.push({ id: i, name: i.toString() });
});
