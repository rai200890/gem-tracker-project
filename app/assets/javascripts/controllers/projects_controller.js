function ProjectsController($scope, $stateParams, Project, Repository) {
    $scope.loading = false;
    $scope.project = new Project({});

    Repository.index(function(data){
        $scope.repos = data;
        $scope.repositories = [].concat.data;
    });

    $scope.create = function(){
        $scope.loading = true;
        Project.create({project: $scope.project},
            function(response){
                console.log(response);
                $scope.$broadcast('success', 'Project created.');
                $scope.repositories.push(response.repository);
                $scope.loading = false;
            },
            function(response){
                $scope.$broadcast('errors', response.data);
                $scope.loading = false;
            });
    }
}