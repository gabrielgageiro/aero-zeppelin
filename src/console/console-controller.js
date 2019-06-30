app.controller('consoleCtrl', function($scope, ConsoleService) {

    $scope.getRegistros = function(){
      return ConsoleService.getHistorico();
    };

});