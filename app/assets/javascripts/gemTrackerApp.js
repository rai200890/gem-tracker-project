var gemTrackerApp = angular.module('gemTrackerApp',
    ['ngResource','ngRoute','templates','ui.bootstrap', 'zj.namedRoutes']);

gemTrackerApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
//    $routeProvider.
//        when('/', {
//            templateUrl: 'tipos_diploma_legal/index.html',
//            controller: 'TiposDiplomaLegalController',
//            name: 'tipos_diploma_legal'
//        });
});
