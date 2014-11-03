function ProjectController($scope, $state, $stateParams){
    $scope.states = [{name: ".info", description: "Project Info"},
        {name: ".branches", description: "Branches"}
        ,{name: ".diff", description: "Diff"}];

}