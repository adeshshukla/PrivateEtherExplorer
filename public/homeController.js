myApp.controller("homeController", function($scope, $http){

    $scope.accountDetails;   

    $scope.getAllAccountDetails = function(){                
        
        // $http.post('/api/getAllAccountDetails/', $scope.selectedOption)
        $http.get('/api/getAllAccountDetails/')
        .then(function(response){
            //console.log(response);
            $scope.accountDetails = response.data;
            // alert('Vote submitted successfully...!!!');            
            // $location.path('/home');
        },function(err){
            alert('Some technical error...!!!');
            console.log(err);
        });
    }

    $scope.getAllAccountDetails();
});