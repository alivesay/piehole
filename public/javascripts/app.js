'use strict';

var pieholeApp = {}
var app = angular.module('pieholeApp', [ 'pieholeApp.directives', 'pieholeApp.filters' ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
  }]);
