(function() {
"use strict";
angular.module('mjv')
.controller('ListContentUploadCtrl', function ($scope, $timeout,$state,$location, $http,Upload,notify) {
     $scope.message = ''; 
       //$scope.status = {1:'Open',2:'In Progress',3:'Closed',4:'Force Closed'};
       $scope.status = {1: 'Yet to be reviewed',2:'Closed by self',3:'Rejected',4: 'Published'}
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
            
            $scope.requestStatus = [
                {id: 1, name: 'Yet to be reviewed'},
                {id: 2, name: 'Closed by self'},
                {id: 3, name: 'Rejected'},
                {id: 4, name: 'Published'}
                ];
               // $scope.requestStatus = [{id:1,name:'Open'},{id:2,name:'In process'},{id:3,name:'Closed'},{id:4,name:'Force Closed'}];
$scope.backNav = function(){
    angular.element('.FormView').hide();
           angular.element('.TableList').show();
};
        $scope.someClickHandler = function(info) {
           angular.element('.FormView').show();
           angular.element('.TableList').hide();
           console.log(info);
            $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p="+info.portal_type).then(function(response){
                            $scope.getAttachments(info.attachments);
                                $scope.serviceOptions = response.data;
                                $scope.data= info;
                            });
           
            

            
        };
         $scope.getAttachments = function (att) {
                            alert(att);
                            angular.element(JSON.parse(att)).each(function(key,val){
                                //console.log(val);
                             var ext = val.split('.').pop();
                               var filePath = './img/doc.png';
                 var fileName = val.split('__-__');
                 if(ext === 'png'||ext === 'gif'||ext === 'jpg')
                     var filePath = "../MJV_SERVICES/services/services.php?q=getPic&p="+val;
                                 if(ext === 'pdf')
                filePath = './img/pdf.png';
                                 var fil = {
                 imgPic  : filePath,
                nameFile : fileName[1],
                attachId:fileName[0],
                dpath :"../MJV_SERVICES/services/uploads/"+val
                 };
                 $scope.fillFiles.push(fil);
                            });
                             

                        };
                        $scope.getRandomSpan = function(){
  var text = " ";
var len = 16;
    var charset = "ABCDSabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
};
$scope.fillFiles = [];
            
            $scope.uploadFile = function (file) {
                var attachId = $scope.getRandomSpan();
                 angular.element('.imgT').show();
                console.log(file);
                var filePath = './img/doc.png';
                if(file.type === 'image/png' || file.type === 'image/jpeg')
                filePath = file.$ngfBlobUrl;
            if(file.type === 'application/pdf')
                filePath = './img/pdf.png';
               
                var fil = {
                 imgPic  : filePath,
                nameFile : file.name,
                attachId:attachId
                 };
                 
                // console.log($scope.fillFiles);
                
                Upload.upload({
                   url: '../MJV_SERVICES/services/fileupload.php',
                   data: {file: file,attachId:attachId}
                }).then(function (resp) {
                    $scope.fillFiles.push(fil);
                    //angular.element('body').append('<div class="alert alert-success"><strong>Success!</strong> Save Successfully...</div>');
                    //angular.element('#dismissModal').trigger('click');
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                   // alert('Your SR Number:'+resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
                
            };
            $scope.deleteImg = function($event){
                console.log($event);
                var index = $scope.fillFiles.indexOf($event);
                 $http.post('../MJV_SERVICES/services/fileupload.php?q='+$event.attachId+'__-__'+$event.nameFile).then(function (resp) {
                    $scope.fillFiles.splice(index, 1); 
                });
                
               
            }
   $scope.update = function(model){
                 $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p="+model).then(function(response){
                              
                                $scope.serviceOptions = response.data;
                            });
            };
        $scope.columnDefs = [ 
            { "mDataProp": "title", "aTargets":[0],'bSortable': true,},
            { "mDataProp": "portal_type", "aTargets":[1] },
            { "mDataProp": "created_by", "aTargets":[2] },
            { "mDataProp": "created_date", "aTargets":[3] },
            { "mDataProp": "status", "aTargets":[4] },
             { "mDataProp": "id", "aTargets":[5],"sClass":"action-grid" }
        ]; 
        $scope.saveContent = function(){
            
            $http.post('../MJV_SERVICES/services/services.php?q=editUploadContent',$scope.data).then(function(response){
                if(response.data.type===1){
                 $http.get('../MJV_SERVICES/services/services.php?q=loadAllUploadContent').then(function(response){
        
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
      
    $http.get('../MJV_SERVICES/services/services.php?q=loadAllUploadContent').then(function(response){
        
       $scope.sampleProductCategories = response.data; 
    });
            
          
});
})();