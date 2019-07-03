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
        let avioesAtivos = AviaoFactory.getAvioesAtivos();
        for (let i = 0 ; i< avioesAtivos.length; i++){
            let x = avioesAtivos[i].getX();
            let y = avioesAtivos[i].getY();

            x *= ($scope.escalonarX / 100);
            y *= ($scope.escalonarY / 100);

            avioesAtivos[i].setX(x);
            avioesAtivos[i].setY(y);
        }
    };

    $scope.rotacionar = function () {
        let avioesAtivos = AviaoFactory.getAvioesAtivos();

        for(let i=0; i<avioesAtivos.length; i++){
            let x = avioesAtivos[i].getX();
            let y = avioesAtivos[i].getY();
            let angulo = avioesAtivos[i].getAngulo();
            
            x = x * Math.cos(angulo * Math.PI / 180) - y * Math.sin(angulo * Math.PI / 180);
            y = y * Math.cos(angulo * Math.PI / 180) + x * Math.sin(angulo * Math.PI / 180);

            avioesAtivos[i].setX(x);
            avioesAtivos[i].setY(y);
        }

    };


    $scope.segundosHoras = function(segundos){
        return segundos / 3600;
    };


    $scope.init();
});