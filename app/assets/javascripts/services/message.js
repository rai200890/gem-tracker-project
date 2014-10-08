function Message(){
    var self = this;
    self.success = null;
    self.error = null;
    self.errors = null;

    self.showSuccessMessage = function(message){
        self.success = message;
    }

    self.showErrorMessage = function(message){
        self.error = message;
    }

    self.showErrorMessages = function(messages){
        self.errors = {};
        $.each(messages.errors, function(key, value) {
            self.errors[key] = value.join();
        });
    }

    self.closeSuccessMessage = function(){
        self.success = null;
    }

    self.closeErrorMessages = function() {
        self.error = null;
        self.errors = null;
    }

    self.closeAllMessages = function(){
        self.closeSuccessMessage();
        self.closeErrorMessages();
    }
}