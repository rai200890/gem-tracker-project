var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','templates','ui.bootstrap','ui.router','smart-table']);

gemTrackerApp.controller('ProjectController',ProjectController);
gemTrackerApp.controller('ProjectsController',ProjectsController);
gemTrackerApp.controller('MessagesController', MessagesController);
gemTrackerApp.controller('ConfirmationModalController', ConfirmationModalController);

gemTrackerApp.factory('Project', Project);
gemTrackerApp.factory('Repository', Repository);
gemTrackerApp.factory('GemfileVersion', GemfileVersion);
gemTrackerApp.factory('Branch', Branch);
gemTrackerApp.factory('Diff', Diff);

gemTrackerApp.service('$confirmationModal', ConfirmationModal);

gemTrackerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state("projects", {
        url: "/projects",
        templateUrl: "projects/index.html",
        controller: "ProjectsController"
    }).state("projects_details", {
        url: "/projects/:id",
        templateUrl: "projects/show.html",
        controller: ProjectController
    }).state("projects_details.info", {
        url: "/",
        templateUrl: "projects/info.html"
    }).state("projects_details.branches", {
        url: "/branches",
        templateUrl: "branches/show.html",
        controller: BranchController
    }).state("projects_details.diff", {
        url: "/diff",
        templateUrl: "diff/show.html",
        controller: DiffController
    });


    //$urlRouterProvider.otherwise("/");
});