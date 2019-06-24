aviaoApp.factory('Aviao', function() {

    function Aviao() {
        this.nome = 'oi1';
        this.selecionado = true;
    }


    Aviao.prototype.getX = function () {
        return this.x;
    };

    Aviao.prototype.setX = function (x) {
        this.x = x;
    };

    Aviao.prototype.getY = function () {
        return this.y;
    };

    Aviao.prototype.setY = function (y) {
        this.y = y;
    };

    Aviao.prototype.getRaio = function () {
        return this.raio;
    };

    Aviao.prototype.setRaio = function (raio) {
        this.raio = raio;
    };

    Aviao.prototype.getAngulo = function () {
        return this.angulo;
    };

    Aviao.prototype.setAngulo = function (angulo) {
        this.angulo = angulo;
    };

    Aviao.prototype.getVelocidade = function () {
        return this.velocidade
    };

    Aviao.prototype.setVelocidade = function (velocidade) {
        this.velocidade = velocidade;
    };

    Aviao.prototype.getDirecao = function () {
        return this.direcao
    };

    Aviao.prototype.setDirecao = function (direcao) {
        this.direcao = direcao;
    };

    Aviao.prototype.getMatricula = function () {
        return this.matricula;
    };

    Aviao.prototype.isSelecionado = function () {
        return this.selecionado;
    };

    Aviao.prototype.changeSelecionado = function () {
        return this.selecionado = !this.selecionado;
    };

    return Aviao;
});