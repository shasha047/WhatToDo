(function () {
  'use strict';

  angular
    .module('todos')
    .controller('TodosController', TodosController);

  TodosController.$inject = ['$scope', 'Authentication', '$stateParams', '$location', 'TodosService'];

  function TodosController($scope, $stateParams, $location, Authentication, TodosService) {
    // var vm = this;

    // vm.todo = todo;
    // vm.authentication = Authentication;

    $scope.prepareCreate = function() {
      $scope.todo = new TodosService();
    };


    $scope.list = function() {
      $scope.todos = TodosService.query();
    };

    $scope.save = function() {
      $scope.todo.$save(function(todo) {
        // $location.path('todos' + todo._id);
        console.log('saved');
        $scope.prepareCreate();
      });
    };
  }
}());

// (function () {
//   'use strict';

// angular.module('todos',[]).controller('TodosController', ['$scope', 'Authentication', '$stateParam', '$location', 'TodosService', function($scope, Authentication, $stateParam, $location, TodosService){
//      $scope.todo = new TodosService();
//      $scope.save = function(){
//       console.log('alert block start');
//        alert();
//       console.log('alert block end');
//     };
//   }
// ]);
// }());
