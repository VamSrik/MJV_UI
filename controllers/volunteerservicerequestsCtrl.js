(function() {
"use strict";
angular.module('mjv')
.controller('VolunteerServiceRequestsCtrl', function ($scope, $timeout, $http,Upload) {
    
    var vm = $scope;

 $scope.people = [];
$http.get("../MJV_SERVICES/services/services.php?q=getVolunteers&p=jj").then(function(response){
                            
                                $scope.people = response.data;
                            });
  

              $scope.message = ''; 
       $scope.status = {1:'Open',2:'In Progress',3:'Closed',4:'Force Closed'};
    $scope.flag= false;
        $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(4)', nRow).html( $scope.status[aData.status]);
            $('td:eq(5)', nRow).html('');
             $('td:eq(5)', nRow).append('<button >Edit</button>').bind('click', function() {
                 
                $scope.$apply(function() {
                  //  $scope.flag= true;
                    $scope.someClickHandler(aData);
                });
            });
            
            return nRow;
        };
        $scope.segmentOptions = [
                {id: 1, label: 'General Updates'},
                {id: 2, label: 'Health & Welfare'},
                {id: 3, label: 'Career & Education'},
                {id: 4, label: 'Social & Security'},
                {id: 5, label: 'Art & Culture'},
                {id: 6, label: 'Women welfare'}];
            
            
$scope.backNav = function(){
    angular.element('.FormView').hide();
           angular.element('.TableList').show();
};
        $scope.someClickHandler = function(info) {
           angular.element('.FormView').show();
           angular.element('.TableList').hide();
           console.log(info);
            $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p="+info.portal_type).then(function(response){
                            
                                $scope.serviceOptions = response.data;
                                $scope.data= info;
                            });
           
            

            
        };
        $scope.requestStatus = [{id:1,name:'Open'},{id:2,name:'In process'},{id:3,name:'Closed'},{id:4,name:'Force Closed'}];
   $scope.update = function(model){
                 $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p="+model).then(function(response){
                              
                                $scope.serviceOptions = response.data;
                            });
            };
        $scope.columnDefs = [ 
            { "mDataProp": "sr_number", "aTargets":[0],'bSortable': true,},
            { "mDataProp": "title", "aTargets":[1] },
            { "mDataProp": "requestor_name", "aTargets":[2] },
            { "mDataProp": "created_date", "aTargets":[3] },
            { "mDataProp": "status", "aTargets":[4] },
             { "mDataProp": "portal_type", "aTargets":[5],"sClass":"action-grid" }
        ]; 
        $scope.EditResquest = function(){
            $scope.data.assigned_to_user_id = $scope.data.assigned_to_user_id.id;
            $http.post('../MJV_SERVICES/services/services.php?q=editServiceRequest',$scope.data).then(function(response){
                if(response.data.type===1){
                 $http.get('../MJV_SERVICES/services/services.php?q=loadAllServiceRequests').then(function(response){
        
       $scope.sampleProductCategories = response.data; 
       $scope.backNav(); 
    });
                }
            });
        };
        $scope.overrideOptions = {
            "bStateSave": true,
            "iCookieDuration": 2419200, /* 1 month */
            "bJQueryUI": true,
            "bPaginate": true,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": true,
            "bDestroy": true
        };
        $scope.sampleProductCategories = [];
      
    $http.get('../MJV_SERVICES/services/services.php?q=loadAllServiceRequests').then(function(response){
        
       $scope.sampleProductCategories = response.data; 
    });
            
            });
})();

