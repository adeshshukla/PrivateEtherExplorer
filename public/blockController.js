myApp.controller("blockController", function($scope, $http, $routeParams){
    $scope.addr = $routeParams.addr;
    $scope.block = [];

    $scope.getBlock = function(){
        //console.log("addr : " + $scope.addr);
        $http.get('/api/getBlock/' + $scope.addr)
        .then(function(response){
            // console.log(response.data);
            $scope.block = response.data;            
        }, function(err){
            alert("Some technical error...!!!");
            console.log(err);
        });
    }

    $scope.getBlock();
});