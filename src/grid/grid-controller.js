app.controller('gridCtrl', function($scope, $mdDialog, AviaoFactory) {

    $scope.init = function(){
    };


    $scope.getTesteAviao = function(){
        return AviaoFactory.getAvioes();
    };

    $scope.removerAviao = function (index) {
        var confirm = $mdDialog.confirm()
            .title('Remover avião ? Risco de acidente!')
            .textContent('Removendo o aviao, ele não será monitorado e cairá.')
            .ariaLabel('Remover')
            .ok('Remover')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            AviaoFactory.removeAviao(index);
        }, function() {
            console.log("Cancelou");
        });
    };


    $scope.init();
});