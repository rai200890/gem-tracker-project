function DiffController($scope, $stateParams, Branch, GemfileVersion, Diff) {
    var repository_id = $stateParams.id;
    $scope.diff = null;
    $scope.branches = [];

    $scope.oldBranch = null;
    $scope.newBranch = null;

    $scope.oldGemfileVersion = null;
    $scope.newGemfileVersion = null;

    $scope.oldGemfileVersions = [];
    $scope.newGemfileVersions = [];

    Branch.index({by_repository_id: repository_id}, function (branches) {
        $scope.branches = branches;
    });

    $scope.view = function () {
        $scope.diff = null;
        if($scope.oldGemfileVersion && $scope.newGemfileVersion)
            Diff.new({old_gemfile_version_id: $scope.oldGemfileVersion.id,
                new_gemfile_version_id: $scope.newGemfileVersion.id}, function (diff) {
                $scope.diff = diff;
            })
    }

    $scope.$watch(function(scope){
        return scope.oldBranch;
        },
        function (newValue) {
            console.log(newValue);
            $scope.oldGemfileVersions = [];
            if (newValue)
                GemfileVersion.index({by_branch_id: newValue}, function (gemfileVersions) {
                    $scope.oldGemfileVersions = gemfileVersions;
                });
        });

    $scope.$watch("newBranch",
        function (newValue) {
            $scope.newGemfileVersions = [];
            if (newValue)
                GemfileVersion.index({by_branch_id: newValue}, function (gemfileVersions) {
                    $scope.newGemfileVersions = gemfileVersions;
                });
        });

    $scope.$watch("newGemfileVersion", $scope.view);
    $scope.$watch("oldGemfileVersion", $scope.view);

}