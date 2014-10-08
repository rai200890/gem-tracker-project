function ProjectsController($scope, Project, Repository, $modal) {
    $scope.project = new Project({});

    Repository.index(function(data){
        $scope.repos = data;
        $scope.repositories = [].concat.data;
    });

    $scope.create = function(){
        Project.create({project: $scope.project},
            function(){
                $scope.$broadcast('success', 'Project created.');
            },
            function(response){
                $scope.$broadcast('errors', response.data);
            });
    }

    $scope.chooseBranch = function (repository) {
        var modalInstance = $modal.open({
            templateUrl: 'projects/choose_branch.html',
            controller: BranchChooserController,
            size: "lg",
            resolve: {
                repository: function(){
                    return repository
                }
            }
        });
    };
}