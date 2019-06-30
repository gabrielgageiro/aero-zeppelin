app.controller('entradaCtrl', function($scope, Aviao, AviaoFactory, MessageService) {
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
        }, 5000);
    };

    $scope.inserirAviao = function (bean) {
        let aviao = new Aviao();

        aviao.setAngulo(bean.angulo);
        aviao.setX(bean.x);
        aviao.setY(bean.y);
        aviao.setRaio(bean.raio);
        aviao.setVelocidade(bean.velocidade);
        aviao.setDirecao(bean.direcao);

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
        return radar.getContext('2d');
    };

    $scope.desenharNoRadar = function(aviao){
        let radar = document.querySelector('#radar');

        let x = radar.width / 2;
        let y = radar.height / 2;

        x += aviao.getX();
        y -= aviao.getY();
       
        self.ctx.fillText(aviao.getNome(), x, y);

    };

    $scope.geraAviaoAleatorio = function(){
        return Math.floor(Math.random() * 10);
    };

    $scope.atualizaTodosAvioes = function(){
        $scope.limparTela();

        var avioes = AviaoFactory.getAvioes();
        for(let i=0; i < avioes.length; i++){
            $scope.desenharNoRadar(avioes[i]);
        }
    };

    $scope.validarPosicaoAviao = function(novoAviao){
        var avioes = AviaoFactory.getAvioes();
        if(avioes.length < 2){
            return true;
        }

        for(var i=0; i < avioes.length; i++){
            let distancia = $scope.distanciaEntrePontos(novoAviao.getX(), novoAviao.getY(), avioes[i].getX(), avioes[i].getY());

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
        console.log(bean);
        return bean;
    };

    $scope.translandar = function (bean) {
        bean.x += (bean.velocidade * $scope.segundosHoras(1));//esse 1 é o tempo e ele deve ser igual a tempo que iremos atualizar o radar
        bean.y += (bean.velocidade * $scope.segundosHoras(1));
        return bean;
    };

    $scope.segundosHoras = function(segundos){
        return segundos / 3600;
    };

    $scope.limparTela = function () {
        let radar = document.querySelector('#radar'); 
        self.ctx.clearRect(0, 0, radar.width, radar.height)
    };

    $scope.init();
});