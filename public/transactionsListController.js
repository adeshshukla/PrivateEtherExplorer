myApp.controller("transactionsListController", function($scope, $http, $routeParams){
    $scope.id = $routeParams.id;
    $scope.transactionsList = [];

    $scope.getTransactionsFromBlock = function(){
        $http.get('/api/getTransactionsFromBlock/' + $scope.id)
        .then(function(response){
            $scope.transactionsList = response.data;
            //console.log($scope.transactionsList);
        }, function(err){
            alert("Some technical error...!!!");
            console.log(err);
        });
    }

    $scope.getTransactionsFromBlock();
});