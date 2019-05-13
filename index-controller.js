app.controller('indexCtrl', ['$scope', function($scope) {

    $scope.entradaDeDados = {
        x : '',
        y: '',
        raio : '',
        angulo : '',
        velocidade : '',
        direcao : ''
    }

	$scope.init = function(){
		console.table('teste');
	};

	$scope.teste = function(bean){
        console.log(bean);
	}
	
	$scope.init();
}]);