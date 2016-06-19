(function () {
    "use strict";
    angular
            .module('mjv')
            .controller(
                    'TabLayoutCtrl',
                    function ($scope, $timeout, $http, $state) {
                        $('.nav-tabs li').click(function(){
                            $('.nav-tabs li').removeClass('active');
                            $(this).addClass('active');
                        });
                        $state.go('volunteer.servicerequests.request');
                        // $('.nav-tabs li:eq(0)').children('a').trigger('click');
                    });
                })();