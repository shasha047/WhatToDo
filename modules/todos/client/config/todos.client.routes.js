(function () {
  'use strict';

  angular
    .module('todos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('todos', {
        abstract: true,
        url: '/todos',
        template: '<ui-view/>'
      })
      .state('todos.list', {
        url: '',
        controller: 'TodosController',
        templateUrl: '/modules/todos/client/views/list-todos.client.view.html'
      })
      .state('todos.create', {
        url: '/create',
        controller: 'TodosController',
        templateUrl: '/modules/todos/client/views/create-todos.client.view.html'
      })
      ;
  }
}());
