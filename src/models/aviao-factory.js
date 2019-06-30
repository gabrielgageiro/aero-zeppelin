'use strict';

app.factory('AviaoFactory', function (toastError) {
    function AviaoFactory() {
        var avioes = [];

        function _addAviao(aviao) {
            if (!aviao || !aviao.getNome()) {
                toastError.showMessage(false, 'Não foi possível adicionar o avião!');
                return
            }
            avioes.push(aviao);
            //todO: adicionar no console
        }

        function _getAvioes() {
            return avioes;
        }

        function _filterSelecionado(aviao) {
            return aviao.isSelecionado();
        }

        function _getAvioesAtivos() {
            return avioes.filter(_filterSelecionado)
        }

        function _removeAviao(index) {
            if (!index == null || index < 0) {
                toastError.showMessage(false, 'Indice inválido!');
                return;
            }

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

