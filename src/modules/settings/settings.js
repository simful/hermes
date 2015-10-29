angular.module('boilerplate')

.controller('SettingsGeneralCtrl', function($scope) {
	$scope.app.title = "General Settings";
})

.controller('SettingsRoomsCtrl', function($scope) {
	$scope.app.title = "Room Settings";
})

.controller('SettingsRatesCtrl', function($scope) {
	$scope.app.title = "Rate Settings";
})

.controller('SettingsUsersCtrl', function($scope) {
	$scope.app.title = "Users";
})

.controller('SettingsPermissionsCtrl', function($scope) {
	$scope.app.title = "Permissions";
});
