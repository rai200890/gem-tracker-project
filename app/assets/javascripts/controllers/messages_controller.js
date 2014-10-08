function MessagesController($scope){
    $scope.message = new Message();

    $scope.closeSuccessMessage = function(){
        $scope.message.closeSuccessMessage();
    }

    $scope.closeErrorMessages = function() {
        $scope.message.closeErrorMessages();
    }

    $scope.$on('success', function (event, data) {
        $scope.message.closeAllMessages();
        $scope.message.showSuccessMessage(data);
    });

    $scope.$on('error', function (event, data) {
        $scope.message.closeAllMessages();
        $scope.message.showErrorMessage(data);
    });

    $scope.$on('errors', function (event, data) {
        $scope.message.closeAllMessages();
        $scope.message.showErrorMessages(data);
    });
}