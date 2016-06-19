(function() {
	"use strict";
	angular
			.module('mjv')
			.controller(
					'ContactUsCtrl',
					function($scope, $timeout, $state, $location, $http) {

						$scope.saveContactUsList = function() {
							//alert('here');
							$http
									.post(
											'../MJV_SERVICES/services/services.php?q=saveContactUsRequest',
											$scope.data)
									.then(
											function(response) {
												
												if (response.data.type === 1) {

													alert("We have got your message. Thanks for your interest in us. We will get back to you as soon as possible");

												} else {
													alert("Oops! Something went wrong. Could you please try again");
												}
											});

						};
					});
})();