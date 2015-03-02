describe("BranchController", function(){
    beforeEach(module('gemTrackerApp'));

    var $scope, controller, $httpBackend;

    beforeEach(inject(function ($controller, $injector, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $scope = $injector.get('$rootScope').$new();
        controller = $controller('BranchController', { $scope: $scope });
    }));

    describe(".repository_id", function(){
        describe("Given an repository id", function(){
            it("Should store all branches from that repository", function(){
                expect($scope.branches).toEqual([]);
            });
        });
    });

    describe(".selectedBranch", function(){

    });


});