(function() {
"use strict";
angular.module('mjv')
.controller('knowledgeportalCtrl', function ($scope, $timeout, $state,$location,$cookies, $http) {
    
    $(window).scroll(function() {  
    if ($(window).scrollTop() > 415) {
        $('.fixMenu').addClass('fixed');
        
          $('.mid').css({'margin-left':$('.fixMenu').width()+'px'});
          $('.rig').addClass('right-nav');
    }
    else {
        $('.fixMenu').removeClass('fixed');
         $('.mid').css({'margin-left':''});
          $('.rig').removeClass('right-nav');
    }  
});
            //$state.go('home.knowledgeportal.generalupdates');
    $scope.subTitle = "General Update";
     var url = $location.url();
    if(url === '/knowledgeportal'){
        $state.go('home.knowledgeportal.generalupdates');
        
    }
            $scope.showChilds = function (index, event) {
                console.log(event);
                var flg = angular.element(event.target).hasClass('subMenuLinks');
                if (!flg) {

                    if (angular.element(event.target).parent('li').hasClass('no-child')) {
                        angular.element(event.target).parent('li').addClass('active');
                    }
                    else {
                        if (angular.element(event.target).children('i').hasClass('fa-angle-down'))
                            angular.element(event.target).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                        else
                            angular.element(event.target).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                    }
                    $scope.items[index].actives = !$scope.items[index].actives;
                }
                else
                {
                    angular.forEach(angular.element('.side-menu li'), function (value, key) {
                        var a = angular.element(value);
                        a.removeClass('active');
                    });


                    angular.element(event.target).parent('li').addClass('active');
                }
                collapseAnother(index, event);
            };
$('.side-menu').on('click','li',function(){
             $('.side-menu li').removeClass('active');
                $(this).addClass('active');
               
            });
            var collapseAnother = function (index, event) {
                for (var i = 0; i < $scope.items.length; i++) {
                    if (i != index) {
                        $scope.items[i].actives = false;
                    }
                }
            };

            
            if($cookies.token && $cookies.token!==''){
                 $http.defaults.headers.common.Authorization = $cookies.token ;
         $http.get("../MJV_SERVICES/services/services.php?q=getSubmenu").then(function(response){
             $scope.items = response.data;
          //   $scope.items[0].class = 'active';
         });
            }
            else
            {
                $scope.items = [
                {
                    name: "General Updates",
                    class: "active",
                    link: "home.knowledgeportal.generalupdates"

                },
                {
                    name: "Career & Education",
                    link: "home.knowledgeportal.careereducation"
//            subItems: [
//                {name: "Career guidance"},
//                {name: "Job opportunities"},
//                {name: "Job references"},
//                {name: "Online trainings"},
//                {name: "Education sponsorship"}
//            ]
                },
                {
                    name: "Health & Welfare",
                    
                    link: "home.knowledgeportal.healthwelfare"
//            subItems: [
//                {name: "Medical counselling"},
//                {name: "Doctor appointment"},
//                {name: "Blood donation"},
//                {name: "Sponsor funds for health recovery"},
//                {name: "Health camps"},
//                {name: "Medical awareness programs"}
//            ]
                },
                {
                    name: "Art & Culture",
                    
                    link: "home.knowledgeportal.artculture"
//            subItems: [
//                {name: "Art related carnivals"},
//                {name: "Music"},
//                {name: "Dance festival"},
//                {name: "Competitions"},
//                {name: "References for the training institutes"}
//            ]
                },
                {
                    name: "Social & Security",
                    
                    link: "home.knowledgeportal.socialsecurity"
//            subItems: [
//                {name: "Government process awareness"},
//                {name: "Welfare schemes"},
//                {name: "VIP appointments"}
//                HomeCtrl
//            ]
                },
                {
                    name: "Women Welfare",
                    
                    link: "home.knowledgeportal.womenwelfare"
//            subItems: [
//                {name: "Women specific job opportunities"},
//                {name: "Trainings on self employment"},
//                {name: "Women safety"}
//            ]
                }

            ];
            }


			$scope.oneAtATime = true;

            $http.get('../MJV_SERVICES/services/services.php?q=loadAllAnnouncements').then(function(response){                               
                $scope.announcements = response.data;
            });
            
            $scope.status = {
              isCustomHeaderOpen: false,
              isFirstOpen: true,
              isFirstDisabled: false
            };

        });
})();