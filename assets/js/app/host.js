(function() {
  
  'use strict';

  angular.module('chatApp')
    .factory("host", function($location) {
      var port = $location.port();
      return $location.protocol() + "://" + $location.host() + (port ? ":" + port : "");
    });

})();
