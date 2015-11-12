angular.module('boilerplate', ['ui.router', 'ui.select', 'gantt', 'mgcrea.ngStrap', 'ngSanitize', 'ngAnimate', 'hermes.rooms'])

.config(function($stateProvider, $urlRouterProvider, uiSelectConfig) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'src/modules/dashboard/home.html',
			controller: 'DashboardCtrl'
		})

		.state('new-reservation', {
			url: '/new-reservation',
			templateUrl: 'src/modules/reservation/new-reservation-page.html',
			controller: 'NewReservationCtrl',
		})

		.state('rooms', {
			url: '/rooms',
			templateUrl: 'src/modules/rooms/rooms.html',
			controller: 'RoomsCtrl'
		})

		.state('customers', {
			url: '/customers',
			templateUrl: 'src/modules/customers/customers.html',
			controller: 'CustomersCtrl'
		})

		.state('settings', {
			url: '/settings',
			abstract: true,
			templateUrl: 'src/modules/settings/settings.html'
		})

			.state('settings.general', {
				url: '/general',
				templateUrl: 'src/modules/settings/general.html',
				controller: 'SettingsGeneralCtrl'
			})

			.state('settings.rooms', {
				url: '/rooms',
				templateUrl: 'src/modules/settings/rooms.html',
				controller: 'SettingsRoomsCtrl'
			})

			.state('settings.rates', {
				url: '/rates',
				templateUrl: 'src/modules/settings/rates.html',
				controller: 'SettingsRatesCtrl'
			})

			.state('settings.users', {
				url: '/users',
				templateUrl: 'src/modules/settings/users.html',
				controller: 'SettingsUsersCtrl'
			})

			.state('settings.permissions', {
				url: '/permissions',
				templateUrl: 'src/modules/settings/permissions.html',
				controller: 'SettingsPermissionsCtrl'
			});

	$urlRouterProvider.otherwise('/');

	uiSelectConfig.theme = 'bootstrap';
})

.controller('AppCtrl', function($scope, $http) {
	$scope.app = new Object;

	$http.get('/src/config/app.json').success(function(data) {
		$scope.app = data;
	});

	$http.get('/src/config/menu.json').success(function(data) {
		$scope.app.menu = data;
	});

	$http.get('/src/data/user.json').success(function(data) {
		$scope.app.user = data;

		$http.get('/src/data/messages.json').success(function(data) {
			$scope.app.user.messages = data;
		});

		$http.get('/src/data/notifications.json').success(function(data) {
			$scope.app.user.notifications = data;
		})
	});

	$http.get('/src/data/mock.json').success(function(data) {
		$scope.mock = data;
	});
})

.run();
