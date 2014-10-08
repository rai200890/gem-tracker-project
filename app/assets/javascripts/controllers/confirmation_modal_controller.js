function ConfirmationModalController($scope,$modalInstance, message) {
    $scope.message = message;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};