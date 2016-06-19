(function() {
	"use strict";
	angular
			.module('mjv')
			.controller(
					'AnnouncementsCtrl',
					function($scope, $timeout, $state, $location, $http) {
						
						var phone_regex = "^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$";
						$scope.phoneRegex = phone_regex; 
						$scope.title = 'Create Announcement';
						$scope.isCreate = true;
						$scope.announcements = 'Announcements';
						
						$scope.saveAnnouncement = function() {						
							
							if($scope.title == 'Create Announcement') {
								$http
								.post(
										'../MJV_SERVICES/services/services.php?q=saveAnnouncement',
										$scope.data)
								.then(
										function(response) {
											
											if (response.data.type === 1) {												
												alert("Announcement saved successfully");
												$http.get('../MJV_SERVICES/services/services.php?q=loadAllAnnouncements').then(function(response){		                             
						                             $scope.announcementsList = response.data;
						                             $scope.data = '';
						                             $scope.submitted = false;
						                             $scope.isCreate = true;
						                             backNav();
						                          });

											} else {
												alert("Oops! Something went wrong. Could you please try again");
											}
										});
								
							} else {
								$http
								.post(
										'../MJV_SERVICES/services/services.php?q=editAnnouncement',
										$scope.data)
								.then(
										function(response) {
											
											if (response.data.type === 1) {
												alert("Announcement updated successfully");
												$http.get('../MJV_SERVICES/services/services.php?q=loadAllAnnouncements').then(function(response){		                             
						                             $scope.announcementsList = response.data;
						                             $scope.data = '';
						                             $scope.submitted = false;
						                             $scope.title = 'Create Announcement';
						                             $scope.isCreate = true;
						                             backNav();
						                          });
												
					                         } else {
												alert("Oops! Something went wrong. Could you please try again");
											}
										});
								
							}
							
							
														
						};
						
						$scope.message = ''; 
					    $scope.flag= false;
					        $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
					            $('td:eq(4)', nRow).html('');
					            $('td:eq(4)', nRow).append('<button id="edit">Edit</button>').bind('click', function() {
					                 
					                $scope.$apply(function() {
					                  //  $scope.flag= true;
					                    $scope.someClickHandler(aData);
					                });
					            });
					             
					             /*$('td:eq(4)', nRow).append('<button id="delete" style="margin-left:5px;">Delete</button>').bind('click', function() {				                 
						                $scope.deleteAnnouncement(aData);
						            });*/
					            
					            return nRow;
					        };
						
						
						$scope.backNav = function(){
						    angular.element('.FormView').hide();
						    angular.element('.TableList').show();
						    $scope.isCreate = true;
						};
						
				        $scope.someClickHandler = function(info) {
				           angular.element('.FormView').show();
				           angular.element('.TableList').hide();
				           $scope.title = 'Edit Announcement';
				           $scope.data = info;
				           $scope.isCreate = false;
				           
				           if('Y' == $scope.data.public) {
				        	   $scope.data.public = true;
				           } else {
				        	   $scope.data.public = false;
				           }
				           
				           $http.get('../MJV_SERVICES/services/services.php?q=getUserProfileLite&p='+ $scope.data.created_by).then(function(response){		                             
	                             $scope.created_by_name = response.data.first_name + ' '+ response.data.last_name;
	                       });
				           
				           $http.get('../MJV_SERVICES/services/services.php?q=getUserProfileLite&p=' + $scope.data.last_updated_by).then(function(response){		                             
	                             $scope.updated_by_name = response.data.first_name + ' '+ response.data.last_name;
	                       });
				           
				        };
						        
						        
						        
			        $scope.columnDefs = [		                             
			                             { "mDataProp": "title", "aTargets":[0] },
			                             { "mDataProp": "public", "aTargets":[1] },
			                             { "mDataProp": "contacts_list.0.name", "aTargets":[2] },
			                             { "mDataProp": "contacts_list.0.phone", "aTargets":[3] },
			                             { "mDataProp": "id", "aTargets":[4], "sClass":"action-grid" }
			                         ];			        
			                         
			                         $scope.overrideOptions = {
			                             "bStateSave": true,
			                             "iCookieDuration": 2419200, /* 1 month */
			                             "bJQueryUI": true,
			                             "bPaginate": true,
			                             "bLengthChange": false,
			                             "bFilter": false,
			                             "bInfo": true,
			                             "bDestroy": true
			                         };
			                         $scope.announcementsList = [];
			                         
			                         $http.get('../MJV_SERVICES/services/services.php?q=loadAllAnnouncements').then(function(response){			                             
			                             $scope.announcementsList = response.data;
			                          });

			                         $scope.onClickCreate = function() {
			                        	 angular.element('.FormView').show();
			 						    angular.element('.TableList').hide();
			         					$scope.title = 'Create Announcement';
			         					$scope.isCreate = true;			         					
			         				}
			                         
			                         $scope.deleteAnnouncement = function(aData) {
			                        	 console.log(aData);
			                        	 $http
											.post(
													'../MJV_SERVICES/services/services.php?q=deleteAnnouncement',
													aData.id)
											.then(
													function(response) {
														
														if (response.data.type === 1) {												
															alert("Announcement deleted successfully");
															$http.get('../MJV_SERVICES/services/services.php?q=loadAllAnnouncements').then(function(response){		                             
									                             $scope.announcementsList = response.data;
									                         });

														} else {
															alert("Oops! Something went wrong. Could you please try again");
														}
													});
			                         }		                         
			                         
						
					});
	
	
				
				
})();