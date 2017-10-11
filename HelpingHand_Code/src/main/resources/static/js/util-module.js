angular.module('util', ['ui.router', 'ngCookies', 'ui.bootstrap']);

angular.module('util').factory('alertService', alertServiceFactory);
alertServiceFactory.$inject = ['$rootScope', '$timeout'];
function alertServiceFactory($rootScope, $timeout) {
	$rootScope.alerts = [];
	return alertService = {
		add : function(type, msg, timeout) {
			$rootScope.alerts.push({
				type : type,
				msg : msg,
				close : function() {
					return alertService.closeAlert(this);
				}
			});
			
			if (timeout) { 
	            $timeout(function(){ 
	                alertService.closeAlert(this); 
	            }, timeout); 
	        }
		},
		closeAlert : function(alert) {
			return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
		},
		closeAlertIdx : function(index) {
			return $rootScope.alerts.splice(index, 1);
		},
		clear : function() {
			$rootScope.alerts = [];
		}
	};
};

angular.module('util').factory('utilService', utilServiceFactory);
utilServiceFactory.$inject = ['$rootScope', '$state', '$http', '$cookies', 'alertService'];
function utilServiceFactory ($rootScope, $state, $http, $cookies, alertService) {
	return {
		httpRequest: httpRequest
	};
	
	function httpRequest (method, url, data, onSuccess, onError, hasAlert) {
		$http({
			method: method.toUpperCase(),
			url: url,
			data: data
		}).then(function successCallback(response) {
			if (onSuccess instanceof Function) {
				onSuccess(response);
			}
			if (hasAlert) {
				alertService.add('success', 'Your \'' + method + '\' request has been successfully submitted.', 10000);
			}
		}, function errorCallback(response) {
			if(onError instanceof Function) {
				onError(response);
			}
			if (hasAlert) {
				alertService.add('warning', 'Your \'' + method + '\' request has been interrupted! - ' + response.status + ' | ' + response.data.error, 10000);
			}
		});
	};
};