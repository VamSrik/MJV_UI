(function() {
"use strict";
var app = angular.module('mjv', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'checklist-model', 'ngFileUpload', 'ngCookies','textAngular','ngSanitize'])
        .config(['$urlRouterProvider', '$stateProvider','$locationProvider',
            function ($urlRouterProvider, $stateProvider, $locationProvider) {
  //$httpProvider.defaults.common['Authorization'] = $cookies.token;

               $stateProvider.
                        state('needhelp', {
                            url: 'needhelp',
                            templateUrl: 'views/needhelp/layout.html',
                            controller: 'NeedHelpCtrl'
                        }).
                        state('needhelp.submitrequest', {
                            url: '/submitrequest',
                            templateUrl: 'views/needhelp/submitServiceRequest.html',
                            controller: 'SubmitServiceRequestCtrl'
                        }).
                        state('needhelp.trackservicerequest', {
                            url: '/trackservicerequest',
                            templateUrl: 'views/needhelp/trackServiceRequest.html',
                            controller: 'TrackServiceRequestCtrl'
                        }).
                        state('home.knowledgeportal.generalupdates', {
                            url: '/generalupdates',
                            templateUrl: 'views/know/genUptView.html',
                            controller: 'GeneralUpdatesCtrl'
                        }).
                                state('home.knowledgeportal.socialsecurity', {
                            url: '/socialsecurity',
                            templateUrl: 'views/know/socView.html',
                            controller: 'SocViewCtrl'
                        }).
                                 state('home.knowledgeportal.careereducation', {
                            url: '/careereducation',
                            templateUrl: 'views/know/carView.html',
                            controller: 'CarViewCtrl'
                        }).
                                 state('home.knowledgeportal.healthwelfare', {
                            url: '/healthwelfare',
                            templateUrl: 'views/know/heaView.html',
                            controller: 'HeaViewCtrl'
                        }).
                                 state('home.knowledgeportal.artculture', {
                            url: '/artculture',
                            templateUrl: 'views/know/artView.html',
                            controller: 'ArtViewCtrl'
                        }).
                                 state('home.knowledgeportal.womenwelfare', {
                            url: '/womenwelfare',
                            templateUrl: 'views/know/womView.html',
                            controller: 'WomViewCtrl'
                        }).
                        state('volunteer', {
                            url: 'volunteer',
                            templateUrl: 'views/volunteer/layout.html',
                            controller: 'VolunteerCtrl'
                        }).
                                state('admin', {
                            url: 'admin',
                            templateUrl: 'views/admin/layout.html',
                            controller: 'AdminCtrl'
                        }).
                                state('admin.servicerequests', {
                            url: '/servicerequests',
                            templateUrl: 'views/admin/tablayout.html',
                            controller: 'TabLayoutCtrl'
                        }).
                                state('admin.servicerequests.request', {
                            url: '/request',
                            templateUrl: 'views/admin/requestservice.html',
                            controller: 'adminRequestCtrl'
                        }).
                                state('admin.servicerequests.viewed', {
                            url: '/viewed',
                            templateUrl: 'views/admin/viewedservie.html',
                            controller: 'adminServiceRequestsCtrl'
                        }).
                        state('admin.uploadcontent', {
                            url: '/uploadcontent',
                            templateUrl: 'views/admin/contentupload.html',
                            controller: 'ContentUploadCtrl'
                        }).
                                state('admin.listuploadcontent', {
                            url: '/listuploadcontent',
                            templateUrl: 'views/admin/listuploadcontent.html',
                            controller: 'ListContentUploadCtrl'
                        }).
                        state('volunteer.servicerequests', {
                            url: '/servicerequests',
                            templateUrl: 'views/volunteer/tablayout.html',
                            controller: 'TabLayoutCtrl'
                        }).
                                 state('volunteer.servicerequests.request', {
                            url: '/request',
                            templateUrl: 'views/volunteer/requests.html',
                            controller: 'VolunteerRequestsCtrl'
                        }).
                                 state('volunteer.servicerequests.assign', {
                            url: '/assign',
                            templateUrl: 'views/volunteer/assignrequests.html',
                            controller: 'VolunteerAssignCtrl'
                        }).
                        state('volunteer.uploadcontent', {
                            url: '/uploadcontent',
                            templateUrl: 'views/volunteer/contentupload.html',
                            controller: 'ContentUploadCtrl'
                        }).
                                state('volunteer.announcements', {
                            url: '/announcements',
                            templateUrl: 'views/volunteer/announcements.html',
                            controller: 'AnnouncementsCtrl'
                        }).
                        state('gallery', {
                            url: '/gallery',
                            templateUrl: 'views/gallery.html',
                            controller: 'GalleryCtrl'
                        }).
                        state('aboutus', {
                            url: '/aboutus',
                            templateUrl: 'views/aboutus.html',
                            controller: 'AboutUsCtrl'
                        }).
                                 state('contact', {
                            url: '/contactus',
                            templateUrl: 'views/contactus.html',
                            controller: 'ContactUsCtrl'
                        }).
                        state('Dashboard.logout', {
                            url: '/login',
                            controller: 'LogoutCtrl'
                        }).
                        state('home', {
                            url: '/',
                            templateUrl: 'views/homeView.html',
                            controller: 'HomeCtrl'
                        }).
                        state('home.knowledgeportal', {
                            url: 'knowledgeportal',
                            templateUrl: 'views/know/layout.html',
                            controller: 'knowledgeportalCtrl'
                        }).state('home.needhelp.submitrequests1', {
                            url: '/submitrequest',
                            templateUrl: 'views/needhelp/submitServiceRequest.html',
                            controller: 'NeedHelpSubmitRequestCtrl'
                        });
                $urlRouterProvider.otherwise('/');
                $urlRouterProvider.when('', '/');
            }])
        
         
                
       
.controller('GalleryCtrl', function ($scope, $timeout) {
        	$scope.mjv_images = [{'path':'./uploads/Gallery/IMG-20160327-WA0000.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0001.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0002.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0003.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0004.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0005.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0006.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0007.jpg'},
        	                     {'path':'./uploads/Gallery/IMG-20160327-WA0008.jpg'}
        	                    ];
        })
        
        
        
        .controller('AboutUsCtrl', function ($scope, $http, $cookies, $timeout) {
		    
			$scope.mjv_team_members = [	 {	'path':'./uploads/team/dummy.jpg',
											'name':'Satya Bala',
											'jobtitle':'Software Consultant',
											'aboutMember':''
										 },
										 
										 {	'path':'./uploads/team/dummy.jpg',
											'name':'Swathi',
											'jobtitle':'Test Lead',
											'aboutMember':''
										 },
										 
										 {	'path':'./uploads/team/dummy.jpg',
											'name':'Hari Prasad',
											'jobtitle':'Sales Manager',
											'aboutMember':''
										 },
										 {	'path':'./uploads/team/dummy.jpg',
											'name':'Venkat',
											'jobtitle':'Enterpreneur',
											'aboutMember':''
										 },
										 
										 {	'path':'./uploads/team/Srikanth.jpg',
											'name':'Srikanth',
											'jobtitle':'Software Developer',
											'aboutMember':''
										 },
										 
										 {	'path':'./uploads/team/dummy.jpg',
											'name':'Vamshi',
											'jobtitle':'Software Developer',
											'aboutMember':''
										 },
		        	                    ];
   
		})
        
        
         .controller('ContactUsCtrl', function ($scope, $http, $cookies, $timeout) {
      
   
  });
        
app.directive('myTable', function() {
        return function(scope, element, attrs) {

            // apply DataTable options, use defaults if none specified by user
            var options = {};
            if (attrs.myTable.length > 0) {
                options = scope.$eval(attrs.myTable);
            } else {
                options = {
                    "bStateSave": true,
                    "iCookieDuration": 2419200, /* 1 month */
                    "bJQueryUI": true,
                    "bPaginate": false,
                    "bLengthChange": false,
                    "bFilter": false,
                    "bInfo": false,
                    "bDestroy": true
                };
            }

            // Tell the dataTables plugin what columns to use
            // We can either derive them from the dom, or use setup from the controller           
            var explicitColumns = [];
            element.find('th').each(function(index, elem) {
                explicitColumns.push($(elem).text());
            });
            if (explicitColumns.length > 0) {
                options["aoColumns"] = explicitColumns;
            } else if (attrs.aoColumns) {
                options["aoColumns"] = scope.$eval(attrs.aoColumns);
            }

            // aoColumnDefs is dataTables way of providing fine control over column config
            if (attrs.aoColumnDefs) {
                options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
            }
            
            if (attrs.fnRowCallback) {
                options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
            }

            // apply the plugin
            var dataTable = element.dataTable(options);

            
            
            // watch for any changes to our data, rebuild the DataTable
            scope.$watch(attrs.aaData, function(value) {
                var val = value || null;
                if (val) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(scope.$eval(attrs.aaData));
                }
            });
        };
    });
app.directive("flipper", function () {
    return {
        restrict: "E",
        template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
        transclude: true,
        scope: {
            flipped: "="
        }
    };
});

app.directive("front", function () {
    return {
        restrict: "E",
        template: "<div class='front tile' ng-transclude></div>",
        transclude: true
    };
});

app.directive("back", function () {
    return {
        restrict: "E",
        template: "<div class='back tile' ng-transclude></div>",
        transclude: true
    }
});
app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);
        
      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
app.factory('notify',function(){
     return function(msg,head, callback) {
         alert(msg);
         angular.element('body').append('<div class="alertInfo"><div class="alertInfoHead">'+head+'</div><span></span><div class="alertInfoBody">'+msg+'</div><div class="alertInfoFooter"><button class="btn btn-primary">Ok</button></div></div>')
         angular.element('.alertInfoFooter button').click(function() {
             callback();
             angular.element('.alertInfo').remove();
            
         });
     }
});

})();