myApp.controller("blockListController", function($scope, $http){

    $scope.allBlocksFromChain =[];   
    $scope.allBlocksFromFile =[];
    $scope.blockListModel;

    var createBlockListModel = function(blockList){
        $scope.blockListModel =  blockList.map(function(block){
            return {
                        number : block.number,
                        miner : block.miner,
                        timestamp : block.timestamp,
                        txCount : block.transactions.length,
                        size: block.size,
                    }
        });
        
    }

    $scope.getAllBlocks = function(){                
        
        // $http.post('/api/getAllAccountDetails/', $scope.selectedOption)
        if($scope.allBlocksFromChain.length <= 0){
            $http.get('/api/getAllBlocks/')
            .then(function(response){
                // console.log(response);
                $scope.allBlocksFromChain = response.data;
                createBlockListModel($scope.allBlocksFromChain);
                // $location.path('/home');
            },function(err){
                alert('Some technical error...!!!');
                console.log(err);
            });
        }
        else {
            createBlockListModel($scope.allBlocksFromChain);
        }
    }

    $scope.getAllBlocksFromFile = function(){                
        
        if($scope.allBlocksFromFile.length <= 0){            
            $http.get('/api/getAllBlocksFromFile/')
            .then(function(response){
                //console.log(response);
                $scope.allBlocksFromFile = response.data;
                createBlockListModel($scope.allBlocksFromFile);
                // $location.path('/home');
            },function(err){
                alert('Some technical error...!!!');
                console.log(err);
            });
        }
         else {
            createBlockListModel($scope.allBlocksFromFile);
        }        
    }    

});