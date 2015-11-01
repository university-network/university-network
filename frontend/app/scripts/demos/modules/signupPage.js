var db = require('../../../../../server/app/controllers/users')

angular
  .module('theme.demos.signup_page', [
    'theme.core.services'
  ])
  .controller('SignupPageController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });

    var user={
      login:'',
      password:''
    };

    this.logIn = function(){

    };
  }]);


