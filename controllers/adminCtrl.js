(function() {
"use strict";
angular.module('mjv')
 .controller('AdminCtrl', function ($scope, $timeout,$state,$location, $http) {
      $('.side-menu').on('click','li',function(){
             $('.side-menu li').removeClass('active');
                $(this).addClass('active');
               
            });
            $scope.items = [
                {
                    name: "Service Requests",
                    
                    link: "home.admin.servicerequests"

                },
                {
                    name: "Upload content",
                    
                    link: "home.admin.uploadcontent"},
            {
                    name: "View Upload content",
                    
                    link: "home.admin.listuploadcontent"}];
            
            var url = $location.url();
             if(url === '/admin'){
        $state.go('home.admin.servicerequests');
        
    }
    
    if(url === '/admin/uploadcontent')
        $scope.items[1].class = "active";
    else
        $scope.items[0].class = "active";
        });
})();