app.controller('transformacaoCtrl', function($scope, AviaoFactory) {

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
        let avioesAtivos = AviaoFactory.getAvioesAtivos();

        for (let i = 0 ; i< avioesAtivos.length; i++){
            let x = avioesAtivos[i].getX();
            let y = avioesAtivos[i].getY();
            x += (avioesAtivos[i].getVelocidade() * $scope.segundosHoras(1));//esse 1 é o tempo e ele deve ser igual a tempo que iremos atualizar o radar
            y += (avioesAtivos[i].getVelocidade() * $scope.segundosHoras(1));
            avioesAtivos[i].setX(x);
            avioesAtivos[i].setY(y);
        }
    };

    $scope.escalonar = function () { //todo ajustar os calculos
        bean.x += (bean.velocidade * $scope.segundosHoras(1));//esse 1 é o tempo e ele deve ser igual a tempo que iremos atualizar o radar
        bean.y += (bean.velocidade * $scope.segundosHoras(1));
        return bean;
    };

    $scope.rotacionar = function () {
        //tood implementar
    };


    $scope.segundosHoras = function(segundos){
        return segundos / 3600;
    };


    $scope.init();
});