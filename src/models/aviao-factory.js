'use strict';

app.factory('AviaoFactory', function (MessageService, ConsoleService) {
    function AviaoFactory() {
        var avioes = [];

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

        function _translandar(transladarDirecaoX, transladarDirecaoY) {
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
            let y = avioesAtivos[i].getY();

            x *= (escalonarX / 100);
            y *= (escalonarY / 100);

            avioesAtivos[i].setX(x);
            avioesAtivos[i].setY(y);
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

        return {
            addAviao: _addAviao,
            getAvioes: _getAvioes,
            getAvioesAtivos: _getAvioesAtivos,
            removeAviao: _removeAviao,
            translandar: _translandar,
            escalonar: _escalonar,
            rotacionar: _rotacionar
        };
    }

    return new AviaoFactory();
});

