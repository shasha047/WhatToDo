(function () {
  'use strict';

  angular
    .module('todos.services')
    .factory('TodosService', TodosService);

  TodosService.$inject = ['$resource', '$log'];

  function TodosService($resource, $log) {
    var Todo = $resource('/api/todos/:todoId', {
      todoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Todo.prototype, {
      createOrUpdate: function () {
        var todo = this;
        return createOrUpdate(todo);
      }
    });

    return Todo;

    function createOrUpdate(todo) {
      if (todo._id) {
        return todo.$update(onSuccess, onError);
      } else {
        return todo.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(todo) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
