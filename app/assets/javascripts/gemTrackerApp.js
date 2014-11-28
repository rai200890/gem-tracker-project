var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','templates','ui.bootstrap','ui.router','smart-table', 'angular-loading-bar']);

gemTrackerApp.controller('BranchController',BranchController);
gemTrackerApp.controller('ProjectController',ProjectController);
gemTrackerApp.controller('ProjectsController',ProjectsController);
gemTrackerApp.controller('ProjectInfoController',ProjectController);
gemTrackerApp.controller('MessagesController', MessagesController);
gemTrackerApp.controller('ConfirmationModalController', ConfirmationModalController);

gemTrackerApp.factory('Project', Project);
gemTrackerApp.factory('Repository', Repository);
gemTrackerApp.factory('GemfileVersion', GemfileVersion);
gemTrackerApp.factory('GemVersion', GemVersion);
gemTrackerApp.factory('Branch', Branch);
gemTrackerApp.factory('Diff', Diff);

gemTrackerApp.service('$confirmationModal', ConfirmationModal);

gemTrackerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    $locationProvider.html5Mode(true);

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

    $urlRouterProvider.otherwise("/");
});
