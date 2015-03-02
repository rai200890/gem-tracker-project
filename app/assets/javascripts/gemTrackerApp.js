var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','ui.bootstrap','ui.router','smart-table', 'angular-loading-bar']);

gemTrackerApp.controller('BranchController',
    ['$scope', '$state', 'Branch', 'GemfileVersion', '$stateParams', BranchController]);

gemTrackerApp.controller('DiffController',
    ['$scope', '$stateParams', 'Branch', 'GemfileVersion', 'Diff', DiffController]);

gemTrackerApp.controller('GemfileVersionController',
    ['$scope', '$stateParams', 'GemfileVersion', 'GemVersion', GemfileVersionController]);

gemTrackerApp.controller('ProjectController',
    ['$rootScope', '$scope', '$state', ProjectController]);

gemTrackerApp.controller('ProjectsController',
    ['$scope', 'Project', 'Repository', ProjectsController]);

gemTrackerApp.controller('ProjectInfoController',['$scope', '$stateParams', 'Repository',
    ProjectController]);

gemTrackerApp.controller('MessagesController',
    ['$scope', MessagesController]);

gemTrackerApp.controller('ConfirmationModalController',
    ['$scope','$modalInstance', 'message', ConfirmationModalController]);

gemTrackerApp.factory('Project', ['$resource', Project]);

gemTrackerApp.factory('Repository',  ['$resource', Repository]);

gemTrackerApp.factory('GemfileVersion',  ['$resource', GemfileVersion]);

gemTrackerApp.factory('GemVersion', ['$resource',  GemVersion]);

gemTrackerApp.factory('Branch',  ['$resource', Branch]);

gemTrackerApp.factory('Diff',  ['$resource', Diff]);

gemTrackerApp.service('$confirmationModal',['$modal', ConfirmationModal]);

gemTrackerApp.config(['$stateProvider', '$locationProvider', 'cfpLoadingBarProvider',
    function($stateProvider, $locationProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $stateProvider.state("projects", {
            url: "/",
            views: {
                '': { templateUrl: 'projects/index.html', controller: ProjectsController },
                "new@projects" : {templateUrl: "projects/new.html"},
                "list@projects" :{templateUrl: "projects/list.html"}
            }
        }).state("projects_details", {
            url: "/projects/:id",
            templateUrl: "projects/show.html",
            controller: ProjectController
        }).state("projects_details.info", {
            url: "/info",
            templateUrl: "projects/info.html",
            controller: ProjectInfoController
        }).state("projects_details.branches", {
            url: "/branches/:branch_id",
            templateUrl: "branches/show.html",
            controller: BranchController
        }).state("projects_details.diff", {
            url: "/diff",
            templateUrl: "diff/index.html",
            controller: DiffController
        }).state("projects_details.branches.gemfile_version", {
            url: "/gemfile_version/:gemfile_version_id",
            templateUrl: "gemfile_versions/show.html",
            controller: GemfileVersionController
        });

    }
]);