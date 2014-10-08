function ConfirmationModal($modal){
    var service = {};
    service.open = function(message, ok) {
        var modalInstance = $modal.open({
            templateUrl: 'modals/confirmation.html',
            controller: ConfirmationModalController,
            size: "sm",
            resolve: {
                message: function() {
                    return message
                }
            }
        });
        modalInstance.result.then(ok);
    }
    return service;
}