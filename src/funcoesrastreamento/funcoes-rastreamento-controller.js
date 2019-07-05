app.controller('rastreamentoCtrl', function($scope, MessageService, AviaoFactory) {

    $scope.setTempoMinimoColisao = function (tempoMinColisao) {
        AviaoFactory.tempoMinimoColisao(tempoMinColisao);
        console.log(AviaoFactory.tempoMinimoColisao());
    };

    $scope.setDistanciaMinimaAeroporto = function (distanciaAeroporto) {
        AviaoFactory.distanciaMinimaAeroporto(distanciaAeroporto);
        console.log(AviaoFactory.distanciaMinimaAeroporto());
    };

    $scope.setDistanciaMinimaAviao = function (distanciaMinAviao) {
        AviaoFactory.distanciaMinimaAviao(distanciaMinAviao);
        console.log(AviaoFactory.distanciaMinimaAviao());
    };
});