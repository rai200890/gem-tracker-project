function ProjectsController($scope, Project, Repository, $modal) {
    $scope.project = new Project();

    Repository.index(function(data){
        $scope.repos = data;
        $scope.repositories = [].concat.data;
    });

    $scope.create = function(){

    }
//    $scope.editAtribuicoes = function (cargo) {
//        var modalInstance = $modal.open({
//            templateUrl: 'cargos/atribuicoes.html',
//            controller: CargoAtribuicoesController,
//            size: "lg",
//            resolve: {
//                cargo: function(){
//                    return cargo
//                },
//                planos_carreira: function(){
//                    return $scope.planos_carreira
//                }
//            }
//        });
//    };
}