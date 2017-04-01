(function () {
  'use strict';

  angular
    .module('todos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Todos',
      state: 'todos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'todos', {
      title: 'List Todos',
      state: 'todos.list',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'todos', {
      title: 'Create Todos',
      state: 'todos.create',
      roles: ['*']
    });
  }
}());
