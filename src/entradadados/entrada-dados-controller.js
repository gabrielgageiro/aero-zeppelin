app.controller('entradaCtrl', function($scope, Aviao, AviaoFactory) {
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

        AviaoFactory.addAviao(aviao);
        $scope.carregaAviao(aviao);
    };

    $scope.carregaAviao = function (bean) {
        if ($scope.validarPosicaoAviao(bean)) {
            let aviao = new Object();
            aviao.x = bean.x;
            aviao.y = bean.y;
            // let aviao = new Aviao();
            // aviao.setX(bean.x);
            // aviao.setY(bean.y);
            self.avioes.push(aviao);

            //console.log(self.avioes);
            
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

        x += aviao.x;
        y -= aviao.y;
       
        //ctx.fillText(aviao.getNome(), x, y);
        self.ctx.fillText($scope.geraAviaoAleatorio(), x, y);

    };
    $scope.geraAviaoAleatorio = function(){
        return Math.floor(Math.random() * 10);
    };

    $scope.atualizaTodosAvioes = function(){
        //let radar = document.querySelector('#radar');
        $scope.limparTela();
        
        for(let i=0; i<self.avioes.length; i++){
            $scope.desenharNoRadar(self.avioes[i]);            
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