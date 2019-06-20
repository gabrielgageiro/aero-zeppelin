app.controller('gridCtrl', function($scope, $mdDialog) {

    $scope.init = function(){
    };


    $scope.getTesteAviao = function(){
        // var aviao = [];
        //
        // for (var i = 0; i< 13; i++){
        //     aviao.push("AVIÃO LATAM MATRICULA " + i);
        // }
        // return aviao;
    };

    $scope.removerAviao = function (index) {
        var confirm = $mdDialog.confirm()
            .title('Remover avião ? Risco de acidente!')
            .textContent('Removendo o aviao, ele não será monitorado e cairá.')
            .ariaLabel('Remover')
            .ok('Remover')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            console.log("removeu");
        }, function() {
            console.log("Cancelou");
        });
    };


    $scope.init();
});