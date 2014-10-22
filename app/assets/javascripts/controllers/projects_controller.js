function ProjectsController($scope, GitRepository, Project, Repository, $modal) {
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
                $scope.$broadcast('success', 'Project created.');
                $scope.repositories.push(response.data);
                $scope.loading = false;
            },
            function(response){
                $scope.$broadcast('errors', response.data);
                $scope.loading = false;
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