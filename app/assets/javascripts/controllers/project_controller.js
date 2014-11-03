function ProjectController($scope, $state, $stateParams, Project){
    $scope.loading = true;
    $scope.states = [{name: ".info", description: "Project Info"},
        {name: ".branches", description: "Branches"}
        ,{name: ".diff", description: "Diff"}];

       Project.show({id: $stateParams.id}, function(response){
        $scope.project =  response;
        $scope.loading = false;
    });
}