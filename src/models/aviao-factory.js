'use strict';

app.factory('AviaoFactory', function (MessageService, ConsoleService) {
    function AviaoFactory() {
        var avioes = [];
        var DIST_MIN_AEROPORTO = 0;
        var TEMPO_MIN_COLISAO = 0;
        var DIST_MIN_AVIAO = 0;

        function _addAviao(aviao) {
            if (!aviao || !aviao.getNome() || !aviao.getVelocidade() || !aviao.getDirecao()) {
                MessageService.showMessage(false, 'Não foi possível adicionar o avião!');
                return
            }
            avioes.push(aviao);
            ConsoleService.addRegistro('Avião ' + aviao.getNome() + ' Adicionado')
        }

        function _getAvioes() {
            return avioes;
        }

        function _filterSelecionado(aviao) {
            return aviao.isAtivo();
        }

        function _getAvioesAtivos() {
            return avioes.filter(_filterSelecionado)
        }

        function _removeAviao(index) {
            if (!index == null || index < 0) {
                MessageService.showMessage(false, 'Indice inválido!');
                return;
            }
            let removido = avioes.splice(index, 1);
            ConsoleService.addRegistro('Avião ' + removido[0].getNome() + ' Removido')
        }

        function _transladar(transladarDirecaoX, transladarDirecaoY) {
            let avioesAtivos = _getAvioesAtivos();
    
            for (let i = 0 ; i< avioesAtivos.length; i++){
                let x = avioesAtivos[i].getX();
                let y = avioesAtivos[i].getY();
                x += transladarDirecaoX + (avioesAtivos[i].getVelocidade() * _segundosHoras(0.5));
                y += transladarDirecaoY + (avioesAtivos[i].getVelocidade() * _segundosHoras(0.5));
                avioesAtivos[i].setX(x);
                avioesAtivos[i].setY(y);
            }
        }
        
        function _segundosHoras(segundos){
            return segundos / 3600;
        }

        function _escalonar(escalonarX, escalonarY){
        let avioesAtivos = _getAvioesAtivos();

         for (let i = 0 ; i< avioesAtivos.length; i++){
            let x = avioesAtivos[i].getX();
            let altura = avioesAtivos[i].getAltura();
            let largura = avioesAtivos[i].getLargura();

            console.log(x - (largura / 2));
            
            avioesAtivos[i].setX(x - (largura / 2));

            altura += altura * (escalonarX / 100);
            largura += largura * (escalonarY / 100);

            avioesAtivos[i].setAltura(altura);
            avioesAtivos[i].setLargura(largura);
            }
        }

        function _rotacionar(anguloRotacao, centroRotacaoX, centroRotacaoY){
            let avioesAtivos = _getAvioesAtivos();

            for(let i=0; i < avioesAtivos.length; i++){
                let x = avioesAtivos[i].getX();
                let y = avioesAtivos[i].getY();
                
                x = x * Math.cos(anguloRotacao * Math.PI / 180) - x * Math.sin(anguloRotacao * Math.PI / 180);
                y = y * Math.cos(anguloRotacao * Math.PI / 180) + y * Math.sin(anguloRotacao * Math.PI / 180);
    
                avioesAtivos[i].setX(x);
                avioesAtivos[i].setY(y);
            }
        }

        function _tempoMinimoColisao(tempoMinColisao) {
            if(tempoMinColisao){
                TEMPO_MIN_COLISAO = tempoMinColisao;
                ConsoleService.addRegistro('Tempo mínimo de de colisão de ' + tempoMinColisao + ' minutos');
            }
            return TEMPO_MIN_COLISAO;
        }

        function _distanciaMinimaAeroporto(distanciaAeroporto) {
            if(distanciaAeroporto){
                DIST_MIN_AEROPORTO = distanciaAeroporto;
                ConsoleService.addRegistro('Distancia mínima do aeroporto de ' + distanciaAeroporto + ' metros');
            }
            return DIST_MIN_AEROPORTO;
        }

        function _distanciaMinimaAviao(distanciaMinAviao) {
            if(distanciaMinAviao){
                DIST_MIN_AVIAO = distanciaMinAviao;
                ConsoleService.addRegistro('Distancia mínima do avião de ' + distanciaMinAviao + ' metros');
            }
            return DIST_MIN_AVIAO;
        }

        return {
            addAviao: _addAviao,
            getAvioes: _getAvioes,
            getAvioesAtivos: _getAvioesAtivos,
            removeAviao: _removeAviao,
            transladar: _transladar,
            escalonar: _escalonar,
            rotacionar: _rotacionar,
            tempoMinimoColisao: _tempoMinimoColisao,
            distanciaMinimaAeroporto: _distanciaMinimaAeroporto,
            distanciaMinimaAviao: _distanciaMinimaAviao
        };
    }

    return new AviaoFactory();
});

