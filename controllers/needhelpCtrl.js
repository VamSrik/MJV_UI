(function() {
"use strict";
angular.module('mjv')
.controller('NeedHelpCtrl', function ($scope, $timeout,$state,$location,  $http) {
   
    $('.side-menu').on('click','li',function(){
             $('.side-menu li').removeClass('active');
                $(this).addClass('active');
               
            });
            $scope.items = [
                {
                    name: "Service Request",
                    
                    link: "needhelp.submitrequest"

                },
                {
                    name: "Track Service Request",
                    class: "active2 no-child",
//            iconClass:"fa fa-angle-down",
                    link: "needhelp.trackservicerequest"}];
             var url = $location.url();
    if(url === '/needhelp'){
        $state.go('needhelp.submitrequest');
        
    }
    if(url === '/needhelp/trackservicerequest')
        $scope.items[1].class = "active";
    else
        $scope.items[0].class = "active";
        });
})();