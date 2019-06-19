aviaoApp.factory('Aviao', function() {

    function Aviao() {
        this.nome = Utils.getRandomMatricula();
        this.selecionado = true;
    }

    return Aviao;
});