myApp.controller("dashboardController", function ($scope, $http) {

    $scope.chainOverview;

    $scope.getChainOverview = function () {

        // $http.post('/api/getAllAccountDetails/', $scope.selectedOption)
        $http.get('/api/getChainOverview/')
            .then(function (response) {
                console.log('getlatestBlock() --- ')
                console.log(response);
                $scope.chainOverview = response.data;
            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });
    }

    $scope.getChainOverview();
});