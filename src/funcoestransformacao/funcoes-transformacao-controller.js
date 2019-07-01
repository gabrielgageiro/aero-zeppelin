app.controller('transformacaoCtrl', function($scope) {

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


    $scope.translandar = function (bean) {
        bean.x += (bean.velocidade * $scope.segundosHoras(1));//esse 1 é o tempo e ele deve ser igual a tempo que iremos atualizar o radar
        bean.y += (bean.velocidade * $scope.segundosHoras(1));
        return bean;
    };

    $scope.segundosHoras = function(segundos){
        return segundos / 3600;
    };


    $scope.init();
});