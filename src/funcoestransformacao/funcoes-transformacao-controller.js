app.controller('transformacaoCtrl', function($scope, AviaoFactory, MessageService) {

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


    $scope.translandar = function () {
        
        if($scope.transladarDirecaoX != undefined && $scope.transladarDirecaoY != undefined){
            AviaoFactory.transladar($scope.transladarDirecaoX, $scope.transladarDirecaoY);
        } else {
            MessageService.showMessage(false,'Informe o valor X e Y para translandar');
        }
    };

    $scope.escalonar = function () { //todo ajustar os calculos
        if($scope.escalonarX != undefined && $scope.escalonarY != undefined){
            AviaoFactory.escalonar($scope.escalonarX, $scope.escalonarY);
        } else {
            MessageService.showMessage(false,'Informe o valor X e Y para escalonar');
        }
    };

    $scope.rotacionar = function () {
        if($scope.centroRotacaoX != undefined && $scope.centroRotacaoX != undefined && $scope.anguloRotacao){
            AviaoFactory.rotacionar($scope.anguloRotacao, $scope.escalonarX, $scope.escalonarY);
        } else {
            MessageService.showMessage(false,'Informe o valor X, Y e o Angulo para escalonar');
        }
    };

    $scope.init();
});