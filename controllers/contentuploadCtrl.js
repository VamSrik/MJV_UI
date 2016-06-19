(function() {
"use strict";
angular.module('mjv')
.controller('ContentUploadCtrl', function ($scope, $timeout, $http,notify,Upload) {
     //$scope.Content = '';
            $scope.data = {};
            $scope.segmentOptions = [
                {id: 1, label: 'General Updates'},
                {id: 2, label: 'Health & Welfare'},
                {id: 3, label: 'Career & Education'},
                {id: 4, label: 'Social & Security'},
                {id: 5, label: 'Art & Culture'},
                {id: 6, label: 'Women welfare'}];
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
 $scope.deleteImg = function($event){
                console.log($event);
                var index = $scope.fillFiles.indexOf($event);
                 $http.post('../MJV_SERVICES/services/fileupload.php?q='+$event.attachId+'__-__'+$event.nameFile).then(function (resp) {
                    $scope.fillFiles.splice(index, 1); 
                });
                
               
            }
            $scope.saveContent = function () {
                $scope.fillFiles;
                $scope.data.files = [];
                for(var i = 0; i<$scope.fillFiles.length; i++){
                    $scope.data.files.push($scope.fillFiles[i].attachId+'__-__'+$scope.fillFiles[i].nameFile);
                }
                console.log($scope.data);
                $http.post("../MJV_SERVICES/services/services.php?q=cotentUpload",$scope.data)
                        .then(function (response) {
                             $scope.fillFiles = [];
                           $scope.data = {};
                    notify('Created Successfully','Message',function(){
                         
                    });
                        });
            }

        });
})();