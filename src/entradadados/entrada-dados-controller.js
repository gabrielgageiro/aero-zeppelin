app.controller('entradaCtrl', function($scope) {

    $scope.entradaDeDados = {
        x : '',
        y: '',
        raio : '',
        angulo : '',
        velocidade : '',
        direcao : ''
    };

    $scope.init = function(){
        console.table('teste');
    };

    $scope.inserirAviao = function(bean){
        $scope.carregaAviao(bean);
    };

    $scope.carregaAviao = function(bean){
        if($scope.validarPosicaoAviao(bean)){
        var radar = document.querySelector("#radar");

            var ctx = radar.getContext('2d');
    
            //ctx.fillRect(bean.x, bean.y, 5, 3);//x, y, width, height
            var retangulo = new Path2D();
            retangulo.rect(bean.x, bean.y, 8, 6);
            ctx.fill(retangulo);
        }else {
            console.log('Já existe um avião proximo, insira-o em outras coordenadas.');
        }
    };

    $scope.validarPosicaoAviao = function(bean){
        console.log($scope.distanciaEntrePontos(30, 36, 33, 40));
    };
    
    $scope.distanciaEntrePontos = function(x1, y1, x2, y2){
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1)), 2);
    };

    $scope.init();
});