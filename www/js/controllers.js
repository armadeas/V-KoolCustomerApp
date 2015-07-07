angular.module('starter.controllers', ['ionic', 'ionic-datepicker'])
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state,$ionicViewService, $stateParams) {
    if ($stateParams.status=='success') {
      $scope.login_text = 'Your registration is successful.</br>please check email to activate your account.';
    } else{
      $scope.login_text = '<a href="#register" >Create An Account</a> or <a href="#" >Forgot Password</a>';
    }
    $scope.data = {};
    $scope.login = function() {
        AuthService.loginUser({
          'identity' : $scope.data.username,
          'password' : $scope.data.password})
        .success(function(data) {
            //console.log(data);
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            $state.go('home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: data.msg
            });
        });
    }
})
.controller('RegisCtrl', function($scope, AuthService, $ionicPopup, $state, $filter) {

  $scope.data = {};
  $scope.data.birthday = new Date();
  $scope.datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){
          console.log('Date not selected');
      }else{
          console.log('Selected date is : ', $filter('date')(val,'d MMM yyyy'));
          //$scope.data.birthday = $filter('date')(val,'d MMM yyyy');
          $scope.data.birthday = val;
      }
  };
  $scope.tnc = function() {
     var confirmPopup = $ionicPopup.confirm({
        title: 'TERM & CONDITIONS',
        templateUrl : 'templates/tnc-register.html',
        cancelText: 'Cancel' ,
        cancelType: 'button-stable',
        okText: 'I AGREE',
        okType: 'button-energized',
        cssClass: 'custom-popup'
     });
     confirmPopup.then(function(res) {
       if(res) {
        AuthService.registerUser({
          'name' : $scope.data.name,
          'city' : $scope.data.city,
          'phone' : $scope.data.phone,
          'gender' : $scope.data.gender,
          'address' : $scope.data.address,
          'birthday' : $scope.data.birthday,
          'email' : $scope.data.email,
          'password' : $scope.data.password})
        .success(function(data) {
            $state.go('login', {status: 'success'});
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Register failed!',
                template: 'Please check your credentials!'
            });
        });
       } else {
         console.log('You are not sure');
       }
     });
  };
  $scope.register = function() {
        AuthService.registerUser({
          'name' : $scope.data.name,
          'city' : $scope.data.city,
          'phone' : $scope.data.phone,
          'gender' : $scope.data.gender,
          'address' : $scope.data.address,
          'birthday' : $scope.data.birthday,
          'email' : $scope.data.email,
          'password' : $scope.data.password})
        .success(function(data) {
            $state.go('login');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Register failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('homeCtrl', function($scope,$state){
  $scope.promo_list=[{'gambar' : 'img/gambar1.png'}, {'gambar' : 'img/gambar2.png'}, {'gambar' : 'img/gambar1.png'}, {'gambar' : 'img/gambar2.png'}, {'gambar' : 'img/gambar1.png'}];
  ionic.Platform.ready(function () {
        //StatusBar.hide();
  });
})

.controller('temanDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,temanService){

    $scope.showDataId = function() {
      temanService.getId($stateParams.temanId).success(function(datateman) {
            $scope.datateman = datateman;
        });

    };
    $scope.showDataId();

    $scope.back = function (){
        $state.go('tab.teman');
    };

    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
  }, {
            scope : $scope,
            animation : 'slide-in-up'
  });

        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };

  $scope.editModal = function(){
            $scope.taskModal.show();
  };

  $scope.batal = function(){
            $scope.taskModal.hide();
            $scope.showDataId();
  };

  $scope.edit = function(id,nama,alamat,spesialis,fb,icon){
            if (!id){
                $scope.showAlert({
                    title: "Information",
                    message: "Id Mohon Diisi"
                });
            }else if (!nama){
                $scope.showAlert({
                    title: "Information",
                    message: "Nama Mohon Diisi"
                });
            }else if(!alamat){
                $scope.showAlert({
                    title: "Information",
                    message: "Alamat Mohon Diisi"
                });
            }else if(!spesialis){
                $scope.showAlert({
                    title: "Information",
                    message: "Spesialis Mohon Diisi"
                });
            }else if(!fb){
                $scope.showAlert({
                    title: "Information",
                    message: "Fb Mohon Diisi"
                });
            }else if(!icon){
                $scope.showAlert({
                    title: "Information",
                    message: "Icon Mohon Diisi"
                });
            }else{
                $scope.id = id;
                $scope.nama = nama;
                $scope.alamat = alamat;
                $scope.spesialis = spesialis;
                $scope.fb = fb;
                $scope.icon = icon;
                temanService.update({
                    'id' : id,
                    'nama': nama,
                    'alamat': alamat,
                    'spesialis': spesialis,
                    'fb': fb,
                    'icon': icon
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Data Telah Diupdate"
                    });
                },function(err) {
                  console.error('Error', err);
                });
            }
  };

})

.controller('tabCtrl', function($scope){
})
.controller('promoCtrl', function($scope){
  $scope.promo_list=[
    {'judul' : 'Promo K-Series 30 Juni',
    'gambar' : 'img/promo/1.png',
    'isi' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore'}, 
    {'judul' : 'V-Kool Honda HR-V Promo',
    'gambar' : 'img/promo/2.png',
    'isi' : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliq'}, 
    {'judul' : 'V-Kool Mercedes Promo',
    'gambar' : 'img/promo/3.png',
    'isi' : 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'}];
})
.controller('shopCtrl', function($scope){
  $scope.shop_list=[{'gambar' : 'img/shop/1.png'}, {'gambar' : 'img/shop/2.png'}, {'gambar' : 'img/shop/3.png'}, {'gambar' : 'img/shop/2.png'}, {'gambar' : 'img/shop/1.png'}];
})
.controller('rewardCtrl', function($scope){
  $scope.point_reward_list=[
    {'earned_point' : 'Referal',
    'point' : '126 pts',
    'date' : '26 Jan 15',
    'expired' : '30 Nov 16'},
    {'earned_point' : 'Purchase V-Kool',
    'point' : '60 pts',
    'date' : '12 Jun 15',
    'expired' : '24 Jul 16'},
    {'earned_point' : 'Event',
    'point' : '20 pts',
    'date' : '15 Dec 15',
    'expired' : '13 Mei 16'}
  ];
  $scope.used_point_list=[
    {'logo_used' : 'img/reward/mc-logo.png',
    'used_as' : 'Mc Donalds',
    'point' : '-40 pts',
    'date' : '26 Oct 15'},
    {'logo_used' : 'img/reward/domino_pizza-logo.png',
    'used_as' : 'Domino Pizza',
    'point' : '-52 pts',
    'date' : '12 Jun 15'},
    {'logo_used' : 'img/reward/telkomsel-logo.png',
    'used_as' : 'Telkomsel 100K',
    'point' : '-32 pts',
    'date' : '22 Jul 15'},
    {'logo_used' : 'img/reward/mc-logo.png',
    'used_as' : 'Mc Donalds',
    'point' : '-40 pts',
    'date' : '26 Oct 15'},
    {'logo_used' : 'img/reward/domino_pizza-logo.png',
    'used_as' : 'Domino Pizza',
    'point' : '-52 pts',
    'date' : '12 Jun 15'},
    {'logo_used' : 'img/reward/telkomsel-logo.png',
    'used_as' : 'Telkomsel 100K',
    'point' : '-32 pts',
    'date' : '22 Jul 15'},
    {'logo_used' : 'img/reward/mc-logo.png',
    'used_as' : 'Mc Donalds',
    'point' : '-40 pts',
    'date' : '26 Oct 15'},
    {'logo_used' : 'img/reward/domino_pizza-logo.png',
    'used_as' : 'Domino Pizza',
    'point' : '-52 pts',
    'date' : '12 Jun 15'},
    {'logo_used' : 'img/reward/telkomsel-logo.png',
    'used_as' : 'Telkomsel 100K',
    'point' : '-32 pts',
    'date' : '22 Jul 15'},
    {'logo_used' : 'img/reward/mc-logo.png',
    'used_as' : 'Mc Donalds',
    'point' : '-40 pts',
    'date' : '26 Oct 15'},
    {'logo_used' : 'img/reward/domino_pizza-logo.png',
    'used_as' : 'Domino Pizza',
    'point' : '-52 pts',
    'date' : '12 Jun 15'},
    {'logo_used' : 'img/reward/telkomsel-logo.png',
    'used_as' : 'Telkomsel 100K',
    'point' : '-32 pts',
    'date' : '22 Jul 15'},
    {'logo_used' : 'img/reward/mc-logo.png',
    'used_as' : 'Mc Donalds',
    'point' : '-40 pts',
    'date' : '26 Oct 15'},
    {'logo_used' : 'img/reward/domino_pizza-logo.png',
    'used_as' : 'Domino Pizza',
    'point' : '-52 pts',
    'date' : '12 Jun 15'},
    {'logo_used' : 'img/reward/telkomsel-logo.png',
    'used_as' : 'Telkomsel 100K',
    'point' : '-32 pts',
    'date' : '22 Jul 15'}
    /*,
    {'used_as' : 'Trip To Bali',
    'point' : '-120 pts',
    'date' : '15 Dec 15'}
*/  ];
})
.controller('dataTemanCtrl', function($scope,$state, temanService){
    $scope.showData = function() {
      temanService.getAll().success(function(data) {
            $scope.datatemans = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();

    $scope.reload = function (){
        $state.go('tab.teman');
    };

    $scope.delete = function (datateman){
        temanService.delete(datateman.id);
        $scope.datatemans.splice($scope.datatemans.indexOf(datateman),1);
    };
})

.controller('tambahTemanCtrl', function($scope,$ionicPopup,temanService){
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };

    $scope.datateman={};
    $scope.simpan = function (){
        if (!$scope.datateman.nama){
            $scope.showAlert({
                title: "Information",
                message: "nama mohon diisi"
            });
        }else if (!$scope.datateman.alamat){
            $scope.showAlert({
                title: "Information",
                message: "alamat mohon diisi"
            });
        }else if (!$scope.datateman.spesialis){
            $scope.showAlert({
                title: "Information",
                message: "spesialis mohon diisi"
            });
        }else if (!$scope.datateman.fb){
            $scope.showAlert({
                title: "Information",
                message: "facebook mohon diisi"
            });
        }else if (!$scope.datateman.icon){
            $scope.showAlert({
                title: "Information",
                message: "icon mohon diisi"
            });
        }else{
            temanService.create({
                nama: $scope.datateman.nama,
                alamat: $scope.datateman.alamat,
                spesialis: $scope.datateman.spesialis,
                fb: $scope.datateman.fb,
                icon: $scope.datateman.icon
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                });
            });
        }

    };
});
