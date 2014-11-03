function ProjectInfoController($scope, $stateParams, Repository){

    var repository_id = $stateParams.id;

    $scope.repository = Repository.show({id: repository_id}, function(response){
        $scope.repository = response;
    })

}