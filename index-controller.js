var app = angular.module('app', ['ngMaterial', 'ngMessages'])
    .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey');
}).controller('indexCtrl', ['$scope', function($scope) {
    $scope.entradaDeDados = {
        x : '',
        y: '',
        raio : '',
        angulo : '',
        velocidade : '',
        direcao : ''
    };

	$scope.init = function(){
	};

	$scope.init();
}]);