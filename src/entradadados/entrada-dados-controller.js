app.controller('entradaCtrl', function($scope) {
    var self = this;

    self.avioes = [];

    self.cartesiano = true;

    $scope.entradaDeDados = {
        x : '',
        y: '',
        raio : '',
        angulo : '',
        velocidade : '',
        direcao : ''
    };

    $scope.disabilitado = false;

    $scope.init = function(){
        // document.getElementById('polar').style.display = 'none';
    };

    $scope.inserirAviao = function(bean){
        $scope.carregaAviao(bean);
    };

    $scope.carregaAviao = function(bean){
        console.log(bean);
        if($scope.validarPosicaoAviao(bean)){
            var aviao = new Object();
            aviao.x = bean.x;
            aviao.y = bean.y;
            self.avioes.push(bean);
            console.log(self.avioes);

            var radar = document.querySelector("#radar");

            var ctx = radar.getContext('2d');
            ctx.fillStyle = 'red';

            var x = radar.width/2;
            var y = radar.height/2;

            if(bean.x >= 0 && bean.y >= 0){
                //ctx.fillRect(bean.x, bean.y, 5, 3);//x, y, width, height
                x += bean.x;
                y += bean.y;
                
                var retangulo = new Path2D();
                retangulo.rect(x, y, 8, 6);
                ctx.fill(retangulo);
            }
    
            
        }
    };

    $scope.validarPosicaoAviao = function(novoAviao){
        if(self.avioes.length === 0){
            return true;
        }
        for(var i=0; i < self.avioes.length; i++){
            if($scope.distanciaEntrePontos(novoAviao.x, novoAviao.y, self.avioes[i].x, self.avioes[i].y) < 10){
                alert('A distância entre dois aviões não deve ser menor que 10, neste caso ela é '+$scope.distanciaEntrePontos(novoAviao.x, novoAviao.y, self.avioes[i].x, self.avioes[i].y));
                return false;
            }

        }
        return true;
    };
    
    $scope.distanciaEntrePontos = function(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
    };

    $scope.trocaFormaEntradaAviao = function () {
        self.cartesiano = !self.cartesiano;
    };

    $scope.init();
});