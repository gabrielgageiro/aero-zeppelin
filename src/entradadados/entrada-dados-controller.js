app.controller('entradaCtrl', function($scope, Aviao, AviaoFactory, MessageService) {
    const imgAviao = document.getElementById('aviaoImg');
    var self = this;

    self.cartesiano = true;

    $scope.entradaDeDados = {
        x : '',
        y: '',
        raio : '',
        angulo : '',
        velocidade : '',
        direcao : ''
    };

    $scope.init = function(){
        self.ctx = $scope.getContextCanvas();
        setInterval(function(){
            $scope.atualizaTodosAvioes();
        }, 500);
    };

    $scope.inserirAviao = function (bean) {
        let aviao = new Aviao();

        aviao.setAngulo(bean.angulo);
        aviao.setX(bean.x);
        aviao.setY(bean.y);
        aviao.setRaio(bean.raio);
        aviao.setVelocidade(bean.velocidade);
        aviao.setDirecao(bean.direcao);

        if (!aviao.getDirecao() || !aviao.getVelocidade()){
            MessageService.showMessage(false,'Informe a direção e velocidade do avião!')
            return;
        }

        if (!self.cartesiano && bean.raio != null && bean.angulo != null) {
            $scope.polarCartesiano(aviao);
        }

        if($scope.validarPosicaoAviao(aviao)){
            AviaoFactory.addAviao(aviao);
            $scope.desenharNoRadar(aviao);
        }
    };

    $scope.getContextCanvas = function(){
        let radar = document.querySelector('#radar');
        radar.style.width='100%';
        radar.style.height='100%';
        radar.width  = radar.offsetWidth;
        radar.height = radar.offsetHeight;
        return radar.getContext('2d');
    };

    $scope.desenharNoRadar = function(aviao){
        
        if(aviao){
        let radar = document.querySelector('#radar');        

        let x = radar.width / 2;
        let y = radar.height / 2;

        x += aviao.getX();
        y -= aviao.getY();
        self.ctx.drawImage(imgAviao, x, y, 20, 20);
        }
    };

    $scope.atualizaTodosAvioes = function(){
        $scope.limparTela();         

        var avioes = AviaoFactory.getAvioesAtivos();

        for(let i=0; i < avioes.length; i++){
             //avioes[i].setX(avioes[i].getX() + 1);//atualizar a nova posicao do aviao
             avioes[i].setX($scope.getProximaPosicaoAviao(avioes[i].getX(), avioes[i].getY(), avioes[i].getVelocidade()));
            //todo: arrumar os limites
            // if(avioes[i].getX() >= 150 || avioes[i].getX() <= -150 || avioes[i].getY() >= 75 || avioes[i].getY() <= -75){
            //
            //     AviaoFactory.removeAviao(i);
            // }
            if(avioes.length > 0){
            $scope.desenharNoRadar(avioes[i]);
            }
        }
    };

    $scope.validarPosicaoAviao = function(novoAviao){
        var avioes = AviaoFactory.getAvioes();
        if(avioes.length < 1){
            return true;
        }

        for(var i=0; i < avioes.length; i++){
            let distancia = $scope.distanciaEntrePontos(novoAviao.getX(), novoAviao.getY(), avioes[i].getX(), avioes[i].getY());

            console.log('distancia do aviao ' + avioes[i].getNome() + '   ' + distancia);
            if(distancia < 10){
                MessageService.showMessage(false,'A distância entre dois aviões não deve ser menor que 10, neste caso ela é '+ parseFloat(distancia).toPrecision(3));
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

    $scope.polarCartesiano = function (bean) {
        bean.x = bean.raio * Math.cos(bean.angulo * Math.PI / 180);
        bean.y = bean.raio * Math.sin(bean.angulo * Math.PI / 180);
        return bean;
    };

    $scope.limparTela = function () {
        let radar = document.querySelector('#radar'); 
        self.ctx.clearRect(0, 0, radar.width, radar.height)
    };

    $scope.getProximaPosicaoAviao = function(x, y, velocidade){
        return x += velocidade * 1;
    };

    $scope.init();
});