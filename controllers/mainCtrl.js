(function() {
"use strict";
angular.module('mjv')
.controller('MainCtrl', function ($scope, $http, $cookies, $timeout, $location, notify) {
    
            $('.navbar-right').on('click','li',function(){
                $('.navbar-right li').removeClass('active-link');
                $(this).addClass('active-link');
                
            });
            $scope.currentIndex = 0;
            $scope.serviceLink = [
                {name:'Wonders Of JRG',link:'wondersofjrg'},
                {name:'Need Help',link:'needhelp'},
                {name:'Donations',link:'donations'}
            ];
    if($cookies.get('token') &&  $cookies.get('token')!=='')
    {
        $http.defaults.headers.common.Authorization = $cookies.get('token') ;
         $http.get("../MJV_SERVICES/services/services.php?q=getUserProfile").then(function(response){
                                console.log(response);
                               
                                var pic = response.data.profile_pic_path
                                $cookies.put('pic', pic);
                                
                                      
                                angular.element('#profileLink').html('<div id="ProLink"><span class="profilePic"></span><span>'+response.data.first_name +' '+response.data.last_name+'</span></div>');
                                angular.element('.profilePic').css({"background-image":"url('http://localhost/MJV_SERVICES/services/services.php?q=getPic&p="+$cookies.get('pic')+"')"});
                                var content = '<li><div class="menuProfilePic"><label>'+response.data.first_name+' '+response.data.last_name+'</label></div></li>';
                                content += '<li class="dropdownLayout"><span data-toggle="modal" data-target="#myModal" >Profile</span><span><button class="btn btn-primary logoutBtn" ng-click="logout()">Logout</button></span></li>';
                                angular.element('.profileMenu').html(content);
                                angular.element('.menuProfilePic').css({"background-image":"url('http://localhost/MJV_SERVICES/services/services.php?q=getPic&p="+$cookies.get('pic')+"')"});
                            angular.element('.logoutBtn').click(function(){
                               $scope.logout();
                            });
                            });
                            //$http.defaults.headers.common.Authorization = $cookies.token ;
          $http.get("../MJV_SERVICES/services/services.php?q=getSubHeader").then(function(response){
             $scope.serviceLink = response.data.menu;
             //$scope.HeaderItems[0].class = "active-link";
            
         });
    }
    $scope.logout = function(){
         $http.post("../MJV_SERVICES/services/services.php?q=logout", $scope.login).then(function(response){
             if(response.data.type===1)
             {
                $cookies.remove('token');
                location.reload();
             }
         });
    }
            $scope.loginCheck = function () {
                $http.post("../MJV_SERVICES/services/services.php?q=loginAuth", $scope.login)
                        .then(function (response) {
                            if(response.data.Auth){
                            var data = response.data;
                            $cookies.put('token',data.token);
                            $http.defaults.headers.common.Authorization = $cookies.get('token') ;
                            $http.get("../MJV_SERVICES/services/services.php?q=getUserProfile").then(function(response){
                                console.log(response);
                                
                                var pic = response.data.profile_pic_path
                                $cookies.put('pic',pic);
                                location.reload();
                                    
//                                angular.element('#profileLink').html('<div id="ProLink"><span class="profilePic"></span><span>'+response.data.first_name +' '+response.data.last_name+'</span></div>');
//                                angular.element('.profilePic').css({"background-image":"url('http://localhost/MJV_SERVICES/services/services.php?q=getPic&p="+$cookies.pic+"')"});
//                                var content = '<li><div class="menuProfilePic"><label>'+response.data.first_name+' '+response.data.last_name+'</label></div></li>';
//                                content += '<li class="dropdownLayout"><span data-toggle="modal" data-target="#myModal" >Profile</span><span><button class="btn btn-primary" ng-click="logout()">Logout</button></span></li>';
//                                angular.element('.profileMenu').html(content);
//                                angular.element('.menuProfilePic').css({"background-image":"url('http://localhost/MJV_SERVICES/services/services.php?q=getPic&p="+$cookies.pic+"')"});
                            
                            });
                            }
                            else
                            {
                                notify(response.data.msg);
                            }
                            //$scope.myWelcome = response.data;
                        });
            };
            $scope.formCheckVal = function () {
                $scope.formCheck = 1;
            };
           
        });

})();