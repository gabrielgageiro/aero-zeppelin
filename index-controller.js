app.controller('indexCtrl', ['$scope', function($scope) {

	$scope.init = function(){
		console.table('teste');
	};

	$scope.teste = function(){
		console.log('oi');
	}
	
	$scope.init();
}]);