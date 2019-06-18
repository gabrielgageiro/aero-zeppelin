app.controller('consoleCtrl', function($scope) {

    var registros = [];
    $scope.init = function(){
        console.log('oi');
    };

    $scope.getRegistros = function(){

      for (var i = 0 ; i< 35;i++){
          let now = new Date();

          let dia = now.getDate().toString();
          console.log(now + " " + 'Oi, sou Goku');
          registros.push(now + " " + 'Oi, sou Goku' +" " + i);
      }
      return registros;
    };


    $scope.init();
});