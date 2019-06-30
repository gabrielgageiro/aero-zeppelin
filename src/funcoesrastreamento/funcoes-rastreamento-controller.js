app.controller('rastreamentoCtrl', function($scope) {

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

    $scope.teste = function(bean){
        console.log(bean);
    };

    $scope.init();
});