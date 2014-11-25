function BranchController($scope, $state, Branch, GemfileVersion, $stateParams) {
    $scope.selectedBranch = null;
    $scope.repository_id = $stateParams.id;

    Branch.index({by_repository_id: $stateParams.id}, function (response) {
        $scope.branches = response;
        if ($stateParams.branch_id) {
            $scope.branches.forEach(function (item, index) {
                if (item.id == $stateParams.branch_id)
                    $scope.selectedBranch = $scope.branches[index];
            });
        }
    });


    $scope.$watch("selectedBranch",
        function (newValue) {
            $scope.gemfileVersions = [];
            if (newValue) {
                $state.go("projects_details.branches", {id: $stateParams.id, branch_id: $scope.selectedBranch.id})
                GemfileVersion.index({by_branch_id: $scope.selectedBranch.id}, function (response) {
                    $scope.gemfile_versions = response;
                    $scope.gemfileVersions = $scope.gemfile_versions.concat([]);
                });
            }
        });
}