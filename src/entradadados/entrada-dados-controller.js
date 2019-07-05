app.controller('entradaCtrl', function($scope, Aviao, AviaoFactory, MessageService) {
    const imgAviao = document.getElementById('aviaoImg');
    let radar = document.querySelector('#radar');
    let LARGURATOTAL = radar.width;
    let ALTURATOTAL = radar.height;

    let MEIALARGURA = LARGURATOTAL / 2;
    let MEIAALTURA = ALTURATOTAL / 2;

    var self = this;

    self.cartesiano = true;
    self.monitorarAvioes = true;

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
        self.ctx.transform(1, 0, 0, -1, 0, radar.height);
        setInterval(function(){
            $scope.atualizaTodosAvioes();
        }, 500);
    };

    $scope.inserirAviao = function (bean) {
        if($scope.validarPosicaoAviao(bean)){
        let aviao = new Aviao();

        aviao.setAngulo(bean.angulo);
        aviao.setX(bean.x);
        aviao.setY(bean.y);
        aviao.setRaio(bean.raio);
        aviao.setVelocidade(bean.velocidade);
        aviao.setDirecao(bean.direcao);        

        if (!aviao.getDirecao() || !aviao.getVelocidade()){
            MessageService.showMessage(false,'Informe a direção e velocidade do avião!');
            return;
        }

        if (!self.cartesiano && bean.raio != null && bean.angulo != null) {
            $scope.polarCartesiano(aviao);
        }

        if($scope.validarPosicaoAviao(aviao)){
            AviaoFactory.addAviao(aviao);
            $scope.desenharNoRadar(aviao);
        }
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

        self.ctx.translate(radar.width / 2, radar.height / 2);

        //x += aviao.getX();
        //y -= aviao.getY();        
        
        self.ctx.drawImage(imgAviao, aviao.getX() - aviao.getLargura() / 2, aviao.getY() - aviao.getAltura() / 2, aviao.getLargura(), aviao.getAltura());
        //self.ctx.rotate(aviao.getDirecao());
        //self.ctx.rotate(0);

        self.ctx.translate( - radar.width / 2, - radar.height / 2);
        }
    };

    $scope.atualizaTodosAvioes = function(){
        if(self.monitorarAvioes) {
            $scope.limparTela();

            var avioes = AviaoFactory.getAvioesAtivos();

        for(let i=0; i < avioes.length; i++){
             //avioes[i].setX(avioes[i].getX() + 1);//atualizar a nova posicao do aviao
             var d = $scope.calcRota(avioes[i].getX(),avioes[i].getY(),avioes[i].getVelocidade());
             //avioes[i].setX($scope.getProximaPosicaoAviaoX(avioes[i].getX(), avioes[i].getVelocidade()));
             avioes[i].setX($scope.getProximaPosicaoAviaoX(d, avioes[i].getDirecao()));
             //avioes[i].setY($scope.getProximaPosicaoAviaoY(avioes[i].getY(), avioes[i].getVelocidade()));
             avioes[i].setY($scope.getProximaPosicaoAviaoY(d, avioes[i].getDirecao()));
             console.log(avioes[i].getX(),avioes[i].getY())
            //todo: arrumar os limites
            // if(avioes[i].getX() >= 150 || avioes[i].getX() <= -150 || avioes[i].getY() >= 75 || avioes[i].getY() <= -75){
            //
            //     AviaoFactory.removeAviao(i);
            // }
            for(let j=0; j < avioes.length; j++){
                if(avioes[i].getNome() != avioes[j].getNome()){
                    let d = $scope.distanciaEntrePontos(avioes[i].getX(), avioes[i].getY(), avioes[j].getX(), avioes[j].getY());
                        if(d < 40){
                            MessageService.showMessage(false,'O avião '+avioes[i].getNome()+' irá colidir com o avião '+avioes[j].getNome());

                        }
                    }
                }

                if (avioes.length > 0) {
                    $scope.desenharNoRadar(avioes[i]);
                }
            }
        }
    };

    $scope.validarPosicaoAviao = function(novoAviao){
        
        var avioes = AviaoFactory.getAvioes();
        if(avioes.length < 1){
            return true;
        }

        for(var i=0; i < avioes.length; i++){
            let distancia = $scope.distanciaEntrePontos(novoAviao.x, novoAviao.y, avioes[i].getX(), avioes[i].getY());
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

    $scope.polarCartesianoRaioAnguloX = function(raio, angulo){
        return raio * Math.cos( angulo * Math.PI/180 );
    };
    $scope.polarCartesianoRaioAnguloY = function(raio, angulo){
        return raio * Math.sin( angulo * Math.PI/180 );
    };

    $scope.limparTela = function () {
        let radar = document.querySelector('#radar'); 
        self.ctx.clearRect(0, 0, radar.width, radar.height)
    };

    $scope.calcRota = function(x,y, velocidade){
        var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2), 2);
        return d += velocidade * 0.5;
    };

    $scope.getProximaPosicaoAviaoX = function(d, direcao){
        return Math.cos( -direcao * Math.PI / 180) * d;
        //return x += velocidade * 0.5;
    };

    $scope.getProximaPosicaoAviaoY = function(d, direcao){
        return Math.sin( -direcao * Math.PI / 180) * d;
        //return y += velocidade * 0.5;
    };

    $scope.changeMonitorarAvioes = function(){
        self.monitorarAvioes = ! self.monitorarAvioes;
    };
    $scope.init();
});

/*



app.controller('entradaCtrl', function($scope, Aviao, AviaoFactory, MessageService) {
    const imgAviao = document.getElementById('aviaoImg');
    let radar = document.querySelector('#radar');
    let LARGURATOTAL = radar.width;
    let ALTURATOTAL = radar.height;

    let MEIALARGURA = LARGURATOTAL / 2;
    let MEIAALTURA = ALTURATOTAL / 2;

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
        if($scope.validarPosicaoAviao(bean)){
        let aviao = new Aviao();

        aviao.setAngulo(bean.angulo);
        aviao.setX(bean.x);
        aviao.setY(bean.y);
        aviao.setRaio(bean.raio);
        aviao.setVelocidade(bean.velocidade);
        aviao.setDirecao(bean.direcao);        

        if (!aviao.getDirecao() || !aviao.getVelocidade()){
            MessageService.showMessage(false,'Informe a direção e velocidade do avião!');
            return;
        }

        if (!self.cartesiano && bean.raio != null && bean.angulo != null) {
            $scope.polarCartesiano(aviao);
        }

        if($scope.validarPosicaoAviao(aviao)){
            AviaoFactory.addAviao(aviao);
            $scope.desenharNoRadar(aviao);
        }
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

        self.ctx.translate(radar.width / 2, radar.height / 2);

        //x += aviao.getX();
        //y -= aviao.getY();        
        
        self.ctx.drawImage(imgAviao, aviao.getX() - aviao.getLargura() / 2, aviao.getY() - aviao.getAltura() / 2, aviao.getLargura(), aviao.getAltura());
        //self.ctx.rotate(aviao.getDirecao());
        //self.ctx.rotate(0);

        self.ctx.translate( - radar.width / 2, - radar.height / 2);
        }
    };

    $scope.atualizaTodosAvioes = function(){
        $scope.limparTela();         

        var avioes = AviaoFactory.getAvioesAtivos();

        for(let i=0; i < avioes.length; i++){
             //avioes[i].setX(avioes[i].getX() + 1);//atualizar a nova posicao do aviao
             var d = $scope.calcRota(avioes[i].getX(),avioes[i].getY(),avioes[i].getVelocidade());
             //avioes[i].setX($scope.getProximaPosicaoAviaoX(avioes[i].getX(), avioes[i].getVelocidade()));
             avioes[i].setX($scope.getProximaPosicaoAviaoX(d, avioes[i].getDirecao()));
             //avioes[i].setY($scope.getProximaPosicaoAviaoY(avioes[i].getY(), avioes[i].getVelocidade()));
             avioes[i].setY($scope.getProximaPosicaoAviaoY(d, avioes[i].getDirecao()));
             console.log(avioes[i].getX(),avioes[i].getY())
            //todo: arrumar os limites
            // if(avioes[i].getX() >= 150 || avioes[i].getX() <= -150 || avioes[i].getY() >= 75 || avioes[i].getY() <= -75){
            //
            //     AviaoFactory.removeAviao(i);
            // }
            for(let j=0; j < avioes.length; j++){
                if(avioes[i].getNome() != avioes[j].getNome()){
                    let d = $scope.distanciaEntrePontos(avioes[i].getX(), avioes[i].getY(), avioes[j].getX(), avioes[j].getY());
                        if(d < 40){
                            MessageService.showMessage(false,'O avião '+avioes[i].getNome()+' irá colidir com o avião '+avioes[j].getNome());

                        }
            }
            }

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
            let distancia = $scope.distanciaEntrePontos(novoAviao.x, novoAviao.y, avioes[i].getX(), avioes[i].getY());
            if(distancia < 40){
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

    $scope.calcRota = function(x,y, velocidade){
        var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2), 2);
        return d += velocidade * 0.5;
    }

    $scope.getProximaPosicaoAviaoX = function(d, direcao){
        return Math.cos( -direcao * Math.PI / 180) * d;
        //return x += velocidade * 0.5;
    };

    $scope.getProximaPosicaoAviaoY = function(d, direcao){
        return Math.sin( -direcao * Math.PI / 180) * d;
        //return y += velocidade * 0.5;
    };
    $scope.init();
});
*/