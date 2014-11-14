function ProjectController($rootScope, $scope, $state){
    $scope.selectedState = null;
    $scope.states = [{name: "projects_details.info", description: "Project Info"},
        {name: "projects_details.branches", description: "Branches"}
        ,{name: "projects_details.diff", description: "Diff"}];

    $scope.states.forEach(function(state, i) {
        if (state.name == $state.current.name)
            $scope.selectedState = $scope.states[i];
    });

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            $scope.states.forEach(function(state, i) {
                if (state.name == toState.name)
                    $scope.selectedState = $scope.states[i];
            });
        })
}