angular.module('starter.services', [])
.service('AuthService', function($q, $http) {
    return {
        loginUser: function(dataLogin) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post('http://192.168.1.145/v-kool/auth/login_auth',dataLogin,{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}})
            .success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              if (data.status == "success") {
                deferred.resolve('Welcome !');
              }else{
                deferred.reject(data);
                //console.log(data);
              }
            })
            .error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              deferred.reject('Something Error please try again');
            });
            /*if (remoteAuth) {
                console.log(remoteAuth);
                //deferred.resolve('Welcome !');
            } else {
                console.log(remoteAuth);
                //deferred.reject('Wrong credentials.');
            }*/
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        registerUser: function(dataRegister) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post('http://192.168.1.145/v-kool/auth/register_user',dataRegister,{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}})
            .success(function(data, status, headers, config) {
              if (data.status == "success") {
                deferred.resolve('Welcome !');
              }else{
                deferred.reject('Incorect Login, please check your credentials');
              }
            })
            .error(function(data, status, headers, config) {
              deferred.reject('Something Error please try again');
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.factory('temanService', function($http) {
    var baseUrl = 'http://herudi-sahimar.16mb.com/simplecrud/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'select.php');
        },
        getId: function (temanId){
            return $http.get(baseUrl+'select_id.php?id='+temanId);
        },
        create: function (datateman){
            return $http.post(baseUrl+'insert.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (datateman){
            return $http.post(baseUrl+'update.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };
});
