app.controller('loginController', function($scope, $state, $cookies, utilService){
	$scope.loginUser = {};
	$scope.isRememberMe = false;
	
	$scope.login = function() {
		utilService.httpRequest('POST', '/user/login', angular.toJson($scope.loginUser), function(response) {
			//success
		}, function(response) {
			//error
		});
	}
});

app.controller('registerUserController', function($scope, $state, $cookies, utilService) {
	$scope.regUser = {};
	$scope.confPassword = "";
	
	$scope.verDocChanged = function(doc) {
		$scope.verDoc = doc.files[0];
		$scope.$apply();
	}
	$scope.proPicChanged = function(pic) {
		var reader = new FileReader();
		reader.onload = function(event) {
			$scope.proPicSrc = event.target.result
			$scope.$apply()
		}
		reader.readAsDataURL(pic.files[0]);
	}
	$scope.requestReg = function() {
		// verDoc and proPic upload
		// if success then
		/*utilService.httpRequest('POST', '/user/requestReg', angular.toJson($scope.regUser), function(response) {
			//success
		}, function(response) {
			//error
		});*/
	}
});

app.controller('headerController', function($scope, $state, $cookies){
	$scope.userName = 'K D K Madusanka';
});
app.controller('footerController', function($scope, $state, $cookies){
	
});
app.controller('dashController', function($scope, $state, $cookies){
	$scope.page = {
		title: 'Seeker',
		subTitle: 'My Seeks',
		filterOn: true
	};
});