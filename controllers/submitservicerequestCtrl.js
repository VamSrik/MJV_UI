(function() {
"use strict";
angular.module('mjv')
.controller('SubmitServiceRequestCtrl', function ($scope, $timeout, $http,Upload,notify) {
         
                    
	 $http.get("../MJV_SERVICES/services/services.php?q=getCategoryTypesForPortal").then(function(response){
         
         $scope.segmentOptions = response.data;
     });
	 
	 $http.get("../MJV_SERVICES/services/services.php?q=getRequestPriorityTypes").then(function(response){         
         $scope.reqPriorityOptions = response.data;
     });
	
	 $http.get("../MJV_SERVICES/services/services.php?q=getRequestSeverityTypes").then(function(response){         
		 $scope.reqSeverityOptions= response.data;
     }); 
                   
            $scope.update = function(model){
                 $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p="+model).then(function(response){
                              
                                $scope.serviceOptions = response.data;
                            });
            };
            
           
  
    
            $scope.deleteImg = function($event){
                console.log($event);
                var index = $scope.fillFiles.indexOf($event);
                 $http.post('../MJV_SERVICES/services/fileupload.php?q='+$event.attachId+'__-__'+$event.nameFile).then(function (resp) {
                    $scope.fillFiles.splice(index, 1); 
                });
                
               
            }
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
            $scope.getRandomSpan = function(){
  var text = " ";
var len = 16;
    var charset = "ABCDSabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
};
            $scope.saveRequest = function () {
                
                $scope.fillFiles;
                $scope.data.files = [];
                for(var i = 0; i<$scope.fillFiles.length; i++){
                    $scope.data.files.push($scope.fillFiles[i].attachId+'__-__'+$scope.fillFiles[i].nameFile);
                }
                 $http.post('../MJV_SERVICES/services/services.php?q=submitRequestInsert',$scope.data).then(function (resp) {
                    
                    
                    notify('Request successfully submited. Your SR Number :'+resp.data + '<br/> Please keep this SR number for future reference. ','Submit Service Request', function() {
                        $scope.submitted = false;
                        $scope.data = "";
                        $scope.fillFiles = [];
                    } );
                });
            };
            })
})();