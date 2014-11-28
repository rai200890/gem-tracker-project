function ProjectsController($scope, $stateParams, Project, Repository) {
    $scope.loading = false;
    $scope.project = new Project({});
    $scope.repositories = [];
    $scope.repos = [];

    Repository.index(function (data) {
        $scope.repos = data;
        $scope.repositories = data.concat([]);
    });

    $scope.create = function () {
        $scope.loading = true;
        Project.create({project: $scope.project},
            function (response) {
                $scope.$broadcast('success', 'Project created.');
                $scope.project = new Project({});
                $scope.repos.push(response.repository);
                $scope.loading = false;
            },
            function (response) {
                $scope.$broadcast('errors', response.data);
                $scope.loading = false;
            });
    }

    $scope.update = function(repository) {
        repository.loading = true;
        Project.update({ id: repository.id },
            function (response) {
                $scope.$broadcast('success', 'Project updated.');
                repository.loading = false;
            },
            function (response) {
                $scope.$broadcast('error', 'Error while updating project.');
                repository.loading = false;
            });
    }
}