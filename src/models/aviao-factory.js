'use strict';

app.factory('AviaoFactory', function (MessageService) {
    function AviaoFactory() {
        var avioes = [];

        function _addAviao(aviao) {
            if (!aviao || !aviao.getNome() || !aviao.getVelocidade() || !aviao.getDirecao()) {
                MessageService.showMessage(false, 'Não foi possível adicionar o avião!');
                return
            }
            avioes.push(aviao);
            MessageService.showMessage(true, 'Avião adicionado com sucesso!');
            //todO: adicionar no console
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
            MessageService.showMessage(true, 'Avião removido!');
            let removido = avioes.splice(index, 1);
            //todo printar no console
        }

        return {
            addAviao: _addAviao,
            getAvioes: _getAvioes,
            getAvioesAtivos: _getAvioesAtivos,
            removeAviao: _removeAviao
        };
    }

    return new AviaoFactory();
});

