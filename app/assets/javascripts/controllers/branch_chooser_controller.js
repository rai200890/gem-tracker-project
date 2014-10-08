function BranchChooserController($scope, $modalInstance,  repository, Branch) {

    $scope.branch_id = null;

    Branch.index({repository_id: repository.id}, function(data){
        $scope.branches = data;
    });

    $scope.open = function(){

    }

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    }
}