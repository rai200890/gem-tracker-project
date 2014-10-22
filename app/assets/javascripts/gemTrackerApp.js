var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','templates','ui.bootstrap','ui.router','smart-table','zj.namedRoutes']);

gemTrackerApp.controller('ProjectsController',ProjectsController);
gemTrackerApp.controller('MessagesController', MessagesController);
gemTrackerApp.controller('ConfirmationModalController', ConfirmationModalController);

gemTrackerApp.factory('GitRepository', GitRepository);
gemTrackerApp.factory('Project', Project);
gemTrackerApp.factory('Repository', Repository);
gemTrackerApp.factory('Branch', Branch);
gemTrackerApp.factory('Diff', Diff);

gemTrackerApp.service('$confirmationModal', ConfirmationModal);

gemTrackerApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/projects', {
            templateUrl: 'projects/index.html',
            controller: 'ProjectsController',
            name: 'projects'
        }).when('diff/new', {
            templateUrl: 'diff/index.html',
            controller: 'DiffController',
            name: 'new_diff'
        }).when("/",{
            templateUrl: 'index.html'
        });
});
