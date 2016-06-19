(function() {
"use strict";
angular.module('mjv')
.controller('HomeCtrl', function ($scope, $timeout, $http, $state, $cookies, $location, Upload) {
       
    var url = $location.url();
    if(url === '/')
        $state.go('home.knowledgeportal');
    $scope.HeaderItems = [{
                    name: "Knowledge Portal",
                   
                    link: "home.knowledgeportal"

                },
                {
                    name: "Wonders Of JRG",
                    
                    link: "home.wondersofjrg"},
            {
                    name: "Need Help",
                    
                    link: "home.needhelp"},
            {
                    name: "Donations",
                   
                    link: "home.donations"}];
            
            
            if($cookies.get('token') && $cookies.get('token') !==''){
                 $http.get("../MJV_SERVICES/services/services.php?q=getUserProfile").then(function(response){
                     console.log(response);
                    $scope.user = response.data;
                });
                 $http.defaults.headers.common.Authorization = $cookies.get('token');
         
            }
            $('.sec-list-view').on('click','li',function(){
             $('.sec-list-view li').removeClass('active-link');
                $(this).addClass('active-link');
               
            });
     $scope.slides = [
                     {image: './uploads/Gallery/IMG-20160327-WA0000.jpg', description: 'Image 00'},
                     {image: './uploads/Gallery/IMG-20160327-WA0001.jpg', description: 'Image 04'},
                     {image: './uploads/Gallery/IMG-20160327-WA0005.jpg', description: 'Image 01'},
                     {image: './uploads/Gallery/IMG-20160327-WA0007.jpg', description: 'Image 02'},
                     {image: './uploads/Gallery/IMG-20160327-WA0008.jpg', description: 'Image 03'}

                 ];
             $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.prevSlide = function () {
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            };

            var slidesInSlideshow = 4;
            var slidesTimeIntervalInMs = 3000;

            $scope.slideshow = 1;
            var slideTimer =
                    $timeout(function interval() {

                        $scope.prevSlide();
                        $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
                        slideTimer = $timeout(interval, slidesTimeIntervalInMs);
                    }, slidesTimeIntervalInMs);
//    $http({ method: 'GET',
//  url: 'http://192.168.1.7/MJV_Service/services/getportaldetails.php'
//}).then(function(response) {
//    console.log(response);
//},function errorCallback(response) {
//console.log(response);
//    // called asynchronously if an error occurs
//    // or server returns response with an error status.
//  });
            $scope.user = {name: '', emailId: '', roles: []};
            $scope.contributions = [
                {id: 1, label: 'General Updates'},
                {id: 2, label: 'Health & Welfare'},
                {id: 3, label: 'Career & Education'},
                {id: 4, label: 'Social & Security'},
                {id: 5, label: 'Art & Culture'},
                {id: 6, label: 'Women welfare'}
            ];
            $scope.idProofOptions = [
                {id: 1, label: 'Aadhar Card'},
                {id: 2, label: 'Electoral Id'},
                {id: 3, label: 'Pan Card'},
                {id: 4, label: 'Passport'},
                {id: 5, label: 'Driving License'},
                {id: 6, label: 'Others'}
            ];
            $scope.idProofSelect = function (options) {

                if (options.id === 6) {
                    $scope.lIdProofName = 1;
                    $scope.user.idProofName = '';
                }
                else {
                    $scope.lIdProofName = 0;                    
                    $scope.user.idProofName = options.label;
                }
            }
            $scope.saveUser = function (user) {

                // $scope.master = angular.copy(user);
                console.log($scope.user);
                $scope.uploadFile($scope.user.fileToUpload);
            };
            $scope.selectImg = 'Select Image';
           
            $scope.uploadImg = function(file){
                console.log(file);
                
                angular.element('.imgT').show();
                $scope.imgPic = file.$ngfBlobUrl;
                var name = file.name;
                $scope.selectImg = name;
               
            };
            
            $scope.uploadFile = function (file) {
                Upload.upload({
                    url: '../MJV_SERVICES/services/fileuploadservice.php?q=user',
                    data: {file: file, 'userDeatils': $scope.user}
                }).then(function (resp) {
                    angular.element('body').append('<div class="alert alert-success"><strong>Success!</strong> Save Successfully...</div>');
                    angular.element('#dismissModal').trigger('click');
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
            
if(url.search("knowledgeportal") > -1 )
    $scope.HeaderItems[0].class = "active-link";
if(url.search("needhelp") > -1 )
$scope.HeaderItems[2].class = "active-link";


if(url.search("donations") > -1 )
    $scope.HeaderItems[3].class = "active-link";
if(url.search("wondersofjrg") > -1 )
    $scope.HeaderItems[1].class = "active-link";

        });
})();