angular.module('starter.controllers', ['ionic', 'ionic-datepicker', 'ngSanitize'])
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state, $ionicHistory, $ionicSideMenuDelegate, $stateParams) {
    $ionicSideMenuDelegate.canDragContent(false)
    console.log($stateParams);
    if ($stateParams.status=='success') {
      $scope.login_text = 'Your registration is successful.<br>please check email to activate your account.';
    } else{
      $scope.login_text = '<a href="#register" >Create An Account</a> or <a href="#" >Forgot Password</a>';
    }
    $scope.data = {};
    $scope.login = function() {
        /*AuthService.loginUser({
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
        });*/
        var alertPopup = $ionicPopup.alert({
            title: 'Debug Login!',
            template: 'Force Login Enable'
        });
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('home');
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
        /*AuthService.registerUser({
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
        });*/
          var alertPopup = $ionicPopup.alert({
                title: 'Debug Register',
                template: 'its debug register please login with random user'
            });
          $state.go('login', {'status': 'success'});
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
.controller('rewardCtrl', function($scope, $ionicHistory){
  $ionicHistory.clearHistory();
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
.controller('newsCtrl', function($scope){
  $scope.news_list=[
    {'judul' : 'PENGAKUAN MURI ATAS TEKNOLOGI V-KOOL',
    'gambar' : 'img/promo/1.png',
    'isi'    : 'Fri, 7 Jun at 09:30 AM'}, 
    {'judul' : 'V-KOOL Lounge di Indonesia International Motor Show 2014',
    'gambar' : 'img/promo/2.png',
    'isi'    : 'Sat, 9 Jun at 10:18 PM'}, 
    {'judul' : 'MAX-R Catat Rekor MURI Mobil Konsep Terpanjang',
    'gambar' : 'img/promo/3.png',
    'isi'    : 'Sun, 24 Dec at 06:18 PM'}];
})
.controller('couponCtrl', function($scope){
  $scope.coupon_data_list=[
    {'coupon_type' : 'New',
    'total' : '126'},
    {'coupon_type' : 'Used / Expired',
    'total' : '60'}
  ];
  $scope.coupon_list=[
    {'judul' : 'Domino Pizza',
    'gambar' : 'img/reward/domino_pizza-logo.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Free Makan di Domino Pizza'}, 
    {'judul' : 'Mc Donalds',
    'gambar' : 'img/reward/mc-logo.png',
    'nominal': 'Rp. 80.000',
    'expired': 'Expired 16 June 2015 - 12:30 AM',
    'isi'    : 'Dapatkan Potongan cuma-cuma seharga'}, 
    {'judul' : 'Pulsa Telkomsel',
    'gambar' : 'img/reward/telkomsel-logo.png',
    'nominal': 'Rp. 75.000',
    'expired': 'Expired 12 June 2015 - 09:30 AM',
    'isi'    : 'Dapatkan Voucher Telkomsel senilai'},
    {'judul' : 'PENGAKUAN MURI ATAS TEKNOLOGI V-KOOL',
    'gambar' : 'img/promo/1.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Fri, 7 Jun at 09:30 AM'}, 
    {'judul' : 'V-KOOL Lounge di Indonesia International Motor Show 2014',
    'gambar' : 'img/promo/2.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Sat, 9 Jun at 10:18 PM'}, 
    {'judul' : 'MAX-R Catat Rekor MURI Mobil Konsep Terpanjang',
    'gambar' : 'img/promo/3.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Sun, 24 Dec at 06:18 PM'},
    {'judul' : 'PENGAKUAN MURI ATAS TEKNOLOGI V-KOOL',
    'gambar' : 'img/promo/1.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Fri, 7 Jun at 09:30 AM'}, 
    {'judul' : 'V-KOOL Lounge di Indonesia International Motor Show 2014',
    'gambar' : 'img/promo/2.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Sat, 9 Jun at 10:18 PM'}, 
    {'judul' : 'MAX-R Catat Rekor MURI Mobil Konsep Terpanjang',
    'gambar' : 'img/promo/3.png',
    'nominal': 'Rp. 120.000',
    'expired': 'Expired 28 December 2015 - 12:30 AM',
    'isi'    : 'Sun, 24 Dec at 06:18 PM'}];
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
    'date' : '22 Jul 15'}];
})
.controller('addPointCtrl', function($scope){
  //$ionicConfigProvider.backButton.previousTitleText(false).text('Reward');
})
.controller('beliVKoolCtrl', function($scope, $ionicPopup){
  //$ionicConfigProvider.backButton.previousTitleText(false).text('Reward');
  $scope.addPointBeli = function () {
    var alertPopup = $ionicPopup.alert({
        title: 'Thank You',
        template: '<p style="text-align:center">Your Request will be proceed <br> with in 2 x 24 hours. <br> we will send you an email for confirmation.</p>',
        okText: 'OK',
        okType: 'button-energized',
        cssClass: 'custom-popup'

    });
  }
})
.controller('referalCtrl', function($scope, $ionicPopup){
    $scope.referFriend = function () {
        var alertPopup = $ionicPopup.alert({
            //title: 'Thank You',
            template: '<p style="text-align:center">Thank You we will send invitation to your friends email.</p>',
            okText: 'OK',
            okType: 'button-energized',
            cssClass: 'custom-popup'

        });
    }
})
.controller('eventCtrl', function($scope){
    $scope.eventList = [{
        event_id : '1',
        title : 'V-Kool Ramadhan Sale',
        date : 'Saturday, 20 June 2015',
        img  : 'img/event/1.png',
        text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {
        event_id : '2',
        title : 'Nobar Bersama V-Kool',
        date : 'Friday, 12 November 2015',
        img  : 'img/event/2.png',
        text : "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur si mollit anim id est laborum."
    },
    {
        event_id : '3',
        title : 'V-Kool Clearance Sale',
        date : 'Monday, 2 April 2016',
        img  : 'img/event/3.png',
        text : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }];
  //$ionicConfigProvider.backButton.previousTitleText(false).text('Reward');
})
.controller('eventDetailCtrl', function($scope){
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
