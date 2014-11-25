function GemfileVersionController($scope, $stateParams, GemfileVersion, GemVersion){

    $scope.repository_id = $stateParams.id;

    $scope.branch_id = $stateParams.branch_id;

    GemfileVersion.show({id : $stateParams.gemfile_version_id}, function(response){
        $scope.gemfileVersion = response;
    })
    GemVersion.index({by_gemfile_version_id : $stateParams.gemfile_version_id}, function(response){
        $scope.gem_versions = response;
        $scope.gemVersions = [].concat(response);
    })
}