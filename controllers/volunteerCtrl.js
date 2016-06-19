(function() {
"use strict";
angular.module('mjv')
 .controller('VolunteerCtrl', function ($scope, $timeout,$state,$location, $http) {
      $('.side-menu').on('click','li',function(){
             $('.side-menu li').removeClass('active');
                $(this).addClass('active');
               
            });
            $scope.items = [
                {
                    name: "Service Requests",
                    
                    link: "volunteer.servicerequests"

                },
                {
                    name: "Upload content",
                    
                    link: "volunteer.uploadcontent"
                }
                ,
                {
                    name: "Announcements",
                    
                    link: "volunteer.announcements"
                 }
           ];
            

            
            
            var url = $location.url();
             if(url === '/volunteer'){
               $state.go('volunteer.servicerequests');
             }
    
             if (url === '/volunteer/announcements') {
              $scope.items[2].class = "active";
             } else if (url === '/volunteer/uploadcontent') {
              $scope.items[1].class = "active";
     } else {
              $scope.items[0].class = "active";
    }
        });
})();