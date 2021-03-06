(function() {
"use strict";
angular.module('mjv')
.controller('SocViewCtrl', function ($scope,   $http, $sce) {
    $scope.subTitle = 'Social & Security';
    var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];
     $http.get("../MJV_SERVICES/services/services.php?q=getSoc&p=4").then(function(response){
         console.log(response);
         $scope.details = response.data;
     });
	 $scope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
}
$scope.dateNum = function(date){
    var day = date.split(' ')[0].split('-')[2];
    return day;
}
$scope.dateMonth = function(date){
    var day = date.split(' ')[0].split('-')[1];
    day = day.replace(/^0+/, '');
    return monthNames[Number(day)-1];
}

});
})();