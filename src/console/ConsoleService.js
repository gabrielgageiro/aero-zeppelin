'use strict';

app.service('ConsoleService', function (MessageService) {
    var self = this;
    self._registros = [];

    self.addRegistro = function (acao) {
        let now = new Date();

        let dia = now.getDate().toString();
        let diaFmt = dia.length < 2 ? '0' + dia : dia;

        let mes = (now.getMonth() + 1).toString();
        let mesFmt = mes.length < 2 ? '0' + mes : mes;

        let hora = now.getHours().toString();
        let horaFmt = hora.length < 2 ? '0' + hora : hora;

        let minuto = now.getMinutes().toString();
        let minutoFmt = minuto.length < 2 ? '0' + minuto : minuto;

        let segundo = now.getSeconds().toString();
        let segundoFmt = segundo.length < 2 ? '0' + segundo : segundo;

        let nowFmt = diaFmt + '/' + mesFmt + '/' + now.getFullYear() + ' ' + horaFmt + ':' + minutoFmt + ':' + segundoFmt + ': ';

        self._registros.push(nowFmt + acao);
    };

    self.getHistorico = function () {
        return self._registros;
    }

});

