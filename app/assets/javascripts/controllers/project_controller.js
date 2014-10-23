function ProjectController($scope, $stateParams, Project){
    Project.show({id: $stateParams.projectId}, function(response){
        $scope.project =  response;
    });
}