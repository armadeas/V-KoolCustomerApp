// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisCtrl'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller: 'tabCtrl',
        templateUrl: 'templates/tab.html'
      })
      .state('home', {
      url: '/home',
      /*views: {
        'tab-home': {*/
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        /*}
      }*/
    })
    .state('tab.promo', {
      url: '/promo',
      views: {
        'tab-promo': {
          templateUrl: 'templates/tab-promo.html',
          controller: 'promoCtrl'
        }
      }
    })
    .state('tab.shop', {
      url: '/shop',
      views: {
        'tab-shop': {
          templateUrl: 'templates/tab-shop.html',
          controller: 'shopCtrl'
        }
      }
    })
    .state('tab.teman', {
      url: '/teman',
      views: {
        'tab-teman': {
          templateUrl: 'templates/dataTeman.html',
          controller: 'dataTemanCtrl'
        }
      }
    })
    .state('tab.teman-detail', {
        url: '/teman/:temanId',
        views: {
          'tab-teman': {
            templateUrl: 'templates/temanDetail.html',
            controller: 'temanDetailCtrl'
          }
        }
      })
    .state('tab.tambah', {
      url: '/tambah',
      views: {
        'tab-tambah': {
          templateUrl: 'templates/tambahTeman.html',
          controller: 'tambahTemanCtrl'
        }
      }
    });
    //$urlRouterProvider.otherwise('/tab/home');
    if (typeof window.localStorage.getItem("username") == "undefined" || window.localStorage.getItem("username") == "" || window.localStorage.getItem("username") == null) {
      $urlRouterProvider.otherwise('/login');
    }else{
      $urlRouterProvider.otherwise('/tab/home');
    }
})

.directive("initFromForm", function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
            val = attrs.value;
            $parse(attr).assign(scope, val);
        }
    };
})
.directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
  return {
    require: '^form',
    restrict: 'A',
    link: function(scope, element, attrs, form) {
      form.$submitted = false;
      var fn = $parse(attrs.onValidSubmit);
      element.on('submit', function(event) {
        scope.$apply(function() {
          element.addClass('ng-submitted');
          form.$submitted = true;
          if (form.$valid) {
            if (typeof fn === 'function') {
              fn(scope, {$event: event});
            }
          }
        });
      });
    }
  }

}])
.directive('validated', ['$parse', function($parse) {
  return {
    restrict: 'AEC',
    require: '^form',
    link: function(scope, element, attrs, form) {
      var inputs = element.find("*");
      for(var i = 0; i < inputs.length; i++) {
        (function(input){
          var attributes = input.attributes;
          if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
            var field = form[attributes.name.value];
            if (field != void 0) {
              scope.$watch(function() {
                return form.$submitted + "_" + field.$valid;
              }, function() {
                if (form.$submitted != true) return;
                var inp = angular.element(input);
                if (inp.hasClass('ng-invalid')) {
                  element.removeClass('has-success');
                  element.addClass('has-error');
                } else {
                  element.removeClass('has-error').addClass('has-success');
                }
              });
            }
          }
        })(inputs[i]);
      }
    }
  }
}]);
