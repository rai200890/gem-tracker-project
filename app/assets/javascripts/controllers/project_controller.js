function ProjectController($scope, $stateParams, Project){
    $scope.project = Project.show();
}