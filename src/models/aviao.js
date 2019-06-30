app.factory('Aviao', function() {

    function Aviao() {
        this.nome = geraAviaoAleatorio();
        this.ativo = true;
    }

    function geraAviaoAleatorio(){
        return Math.floor(Math.random() * 10);
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

    Aviao.prototype.isAtivo = function () {
        return this.ativo;
    };

    Aviao.prototype.changeAtivo = function () {
        return this.ativo = !this.ativo;
    };

    Aviao.prototype.getNome = function () {
        return this.nome;
    };

    return Aviao;
});