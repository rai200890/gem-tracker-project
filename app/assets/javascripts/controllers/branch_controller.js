function BranchController($scope, Branch, GemfileVersion, $stateParams){

    $scope.selectedBranch = null;

    var repository_id = $stateParams.id;

    Branch.index({by_repository_id: repository_id},function(response){
        $scope.branches = response;
    });

    $scope.view = function(){
        GemfileVersion.index({by_branch_id: $scope.selectedBranch},function(response){
            $scope.gemfileVersions =  response;
        });
    }

}