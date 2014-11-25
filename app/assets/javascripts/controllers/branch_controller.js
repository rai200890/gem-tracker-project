function BranchController($scope, Branch, GemfileVersion, $stateParams){

    $scope.selectedBranch = $stateParams.branch_id;
    $scope.repository_id = $stateParams.id;

    Branch.index({by_repository_id: $stateParams.branch_id},function(response){
        $scope.branches = response;
    });


    Branch.show({id: $scope.branch_id},function(response){
        $scope.selectedBranch = response;
    });


    $scope.$watch("selectedBranch",
        function (newValue) {
            $scope.gemfileVersions = [];
            if (newValue)
                GemfileVersion.index({by_branch_id: $scope.selectedBranch.id},function(response){
                    $scope.gemfile_versions = response;
                    $scope.gemfileVersions = $scope.gemfile_versions.concat([]);
                });
        });
}