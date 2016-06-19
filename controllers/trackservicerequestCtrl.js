(function () {
    "use strict";
    angular
            .module('mjv')
            .controller(
                    'TrackServiceRequestCtrl',
                    function ($scope, $timeout, $http, Upload) {

$scope.fillFiles = [];
                        $scope.getRandomSpan = function () {
                            var text = " ";
                            var len = 16;
                            var charset = "ABCDSabcdefghijklmnopqrstuvwxyz0123456789";

                            for (var i = 0; i < len; i++)
                                text += charset.charAt(Math.floor(Math.random() * charset.length));

                            return text;
                        };
                        $scope.uploadFile = function (file) {
                            var attachId = $scope.getRandomSpan();
                            angular.element('.imgT').show();
                            console.log(file);
                            var filePath = './img/doc.png';
                            if (file.type === 'image/png' || file.type === 'image/jpeg')
                                filePath = file.$ngfBlobUrl;
                            if (file.type === 'application/pdf')
                                filePath = './img/pdf.png';

                            var fil = {
                                imgPic: filePath,
                                nameFile: file.name,
                                attachId: attachId
                            };

                            // console.log($scope.fillFiles);

                            Upload.upload({
                                url: '../MJV_SERVICES/services/fileupload.php',
                                data: {file: file, attachId: attachId}
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
                        $scope.deleteImg = function ($event) {
                            console.log($event);
                            var index = $scope.fillFiles.indexOf($event);
                            $http.post('../MJV_SERVICES/services/fileupload.php?q=' +$event.attachId +'__-__'+ $event.nameFile).then(function (resp) {
                                $scope.fillFiles.splice(index, 1);
                            });


                        };
                        $scope.getAttachments = function (att) {
                            
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
                             

                        }


                        $http.get("../MJV_SERVICES/services/services.php?q=getCategoryTypesForPortal").then(function (response) {

                            $scope.segmentOptions = response.data;
                        });

                        $http.get("../MJV_SERVICES/services/services.php?q=getRequestPriorityTypes").then(function (response) {
                            $scope.reqPriorityOptions = response.data;
                        });

                        $http.get("../MJV_SERVICES/services/services.php?q=getRequestSeverityTypes").then(function (response) {
                            $scope.reqSeverityOptions = response.data;
                        });

                        $http.get("../MJV_SERVICES/services/services.php?q=getRequestStatusTypes").then(function (response) {
                            $scope.reqStatusOptions = response.data;
                        });

                        $scope.update = function (portal_type) {
                            $scope.loadServiceOptions(portal_type);
                        };

                        $scope.trackServiceRequest = function (srnumber) {

                            var validSR = true;

                            var sr_regex = new RegExp("^[a-zA-Z]{2}[0-9]{6}$");
                            if (sr_regex.test(srnumber)) {
                                console.log("Valid SR Number : " + srnumber);
                            } else {
                                console.log("Invalid SR Number : " + srnumber);
                                validSR = false;
                                angular.element('.srDetailsDiv').hide();
                                alert("Invalid Service Request Number : " + srnumber + "\n\n Please try with valid SR Number.");
                            }


                            if (validSR) {
                                $http
                                        .get(
                                                '../MJV_SERVICES/services/services.php?q=loadServiceRequest&p='
                                                + srnumber)
                                        .then(
                                                function (response) {
                                                    console.log(response.data);

                                                    if (response.data.length > 0) {
                                                        $scope.data = response.data[0];
                                                        $scope.getAttachments(response.data[0].attachments);
                                                        $scope.loadServiceOptions($scope.data.portal_type);
                                                        angular.element('.srDetailsDiv').show();

                                                    } else {
                                                        $scope.data.sr_number = srnumber;
                                                        angular
                                                                .element(
                                                                        '.srDetailsDiv')
                                                                .hide();
                                                        alert("No Service Request found with SR Number : "
                                                                + srnumber);

                                                    }

                                                });
                            }
                        };


                        $scope.updateServiceRequest = function () {
                            var temp_srnumber = $scope.data.sr_number;
                            $http
                                    .post(
                                            '../MJV_SERVICES/services/services.php?q=editServiceRequest',
                                            $scope.data)
                                    .then(
                                            function (response) {
                                                if (response.data.type === 1) {
                                                    $http
                                                            .get(
                                                                    '../MJV_SERVICES/services/services.php?q=loadServiceRequest&p='
                                                                    + temp_srnumber)
                                                            .then(
                                                                    function (
                                                                            response) {

                                                                        if (response.data.length > 0) {

                                                                            $scope.data = response.data[0];
                                                                            $scope.loadServiceOptions($scope.data.portal_type);
                                                                            angular
                                                                                    .element(
                                                                                            '.srDetailsDiv')
                                                                                    .show();
                                                                            alert("Changes saved successfully for Service Request "
                                                                                    + temp_srnumber);

                                                                        } else {
                                                                            $scope.data.sr_number = temp_srnumber;
                                                                            angular
                                                                                    .element(
                                                                                            '.srDetailsDiv')
                                                                                    .hide();
                                                                            alert("No Service Request found with SR Number : "
                                                                                    + temp_srnumber);

                                                                        }
                                                                    });
                                                } else {
                                                    alert("Error while saving Service Request "
                                                            + temp_srnumber);
                                                }
                                            });
                        };

                        $scope.loadServiceOptions = function (portal_type) {
                            $http.get("../MJV_SERVICES/services/services.php?q=getServiceOptions&p=" + portal_type).then(function (response) {

                                $scope.serviceOptions = response.data;
                            });

                        };

                        $scope.cancelServiceRequest = function () {
                            var temp_srnumber = $scope.data.sr_number;
                            $scope.data.status = 4;
                            $http
                                    .post(
                                            '../MJV_SERVICES/services/services.php?q=editServiceRequest',
                                            $scope.data)
                                    .then(
                                            function (response) {
                                                if (response.data.type === 1) {
                                                    $http
                                                            .get(
                                                                    '../MJV_SERVICES/services/services.php?q=loadServiceRequest&p='
                                                                    + temp_srnumber)
                                                            .then(
                                                                    function (
                                                                            response) {

                                                                        if (response.data.length > 0) {

                                                                            $scope.data = response.data[0];
                                                                            $scope.loadServiceOptions($scope.data.portal_type);
                                                                            angular
                                                                                    .element(
                                                                                            '.srDetailsDiv')
                                                                                    .show();
                                                                            alert("Service Request " + temp_srnumber + " cancelled successfully"
                                                                                    );

                                                                        } else {
                                                                            $scope.data.sr_number = temp_srnumber;
                                                                            angular
                                                                                    .element(
                                                                                            '.srDetailsDiv')
                                                                                    .hide();
                                                                            alert("No Service Request found with SR Number : "
                                                                                    + temp_srnumber);

                                                                        }
                                                                    });
                                                } else {
                                                    alert("Error while cancelling Service Request "
                                                            + temp_srnumber);
                                                }
                                            });

                        };
                    });

})();