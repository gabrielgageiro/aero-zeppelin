app.factory('Aviao', function () {

    function Aviao() {
        this.nome = geraAviaoAleatorio();
        this.ativo = true;
        this.largura = 10;
        this.altura = 10;
    }

    function geraAviaoAleatorio() {
        let arrayCaracteres = ['A', 'B', 'C', 'D', 'E', 'F'];
        let arrayNumeros = ['380', '772', '799', '146', '495', '468'];
        let indiceCaracteres = Math.floor(Math.random() * arrayCaracteres.length);
        let indiceNumeros = Math.floor(Math.random() * arrayNumeros.length);
        
        return arrayCaracteres[indiceCaracteres] + arrayNumeros[indiceNumeros];
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

    Aviao.prototype.getLargura = function () {
        return this.largura;
    };

    Aviao.prototype.setLargura = function (largura) {
        this.largura = largura;
    };

    Aviao.prototype.getAltura = function () {
        return this.altura;
    };

    Aviao.prototype.setAltura = function (altura) {
        this.altura = altura;
    };

    Aviao.prototype.getXAnt = function () {
        return this.xAnt;
    };

    Aviao.prototype.setXAnt = function (xAnt) {
        this.xAnt = xAnt;
    };

    Aviao.prototype.getYAnt = function () {
        return this.yAnt;
    };

    Aviao.prototype.setYAnt = function (yAnt) {
        this.yAnt = yAnt;
    };

    return Aviao;
});