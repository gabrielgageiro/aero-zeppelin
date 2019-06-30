app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("error-toast");
}).service('toastError', function ($mdToast) {
    this.showMessage = function (isSuccess, msg) {
        var type = typeof isSuccess === "boolean" && isSuccess === true ? 'success' : 'error';

        $mdToast.show(
            $mdToast.simple()
                .textContent(msg)
                .position('top right')
                .hideDelay(5000)
                .theme(type + '-toast')
        )
            .then(function () {
            }).catch(function () {
        });
    }
});
