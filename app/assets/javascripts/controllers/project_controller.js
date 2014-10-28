function ProjectController($scope, $stateParams, Project){
    $scope.loading = true;
    $scope.sekectedBranch = null;

    Project.show({id: $stateParams.id}, function(response){
        $scope.project =  response;
        $scope.loading = false;
    });
}