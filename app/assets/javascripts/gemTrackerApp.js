var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','templates','ui.bootstrap','ui.router','smart-table']);

gemTrackerApp.controller('ProjectController',ProjectController);
gemTrackerApp.controller('ProjectsController',ProjectsController);
gemTrackerApp.controller('MessagesController', MessagesController);
gemTrackerApp.controller('ConfirmationModalController', ConfirmationModalController);

gemTrackerApp.factory('Project', Project);
gemTrackerApp.factory('Repository', Repository);
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
    });

    //$urlRouterProvider.otherwise("/");
});