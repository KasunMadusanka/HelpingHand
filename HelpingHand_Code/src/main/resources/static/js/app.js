var app = angular.module('ngApp', ['ui.router', 'ngCookies', 'ui.bootstrap', 'util']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    
    // Common pages (home, gallery, login, register) with common-layout
	    .state('common-layout', {
	        abstract: true,
	        data: {
	        	requireLogin: false
	        },
	        views: {
	        	'footer': {
            		templateUrl: 'pages/common-footer.html',
            		controller: 'commonFooterController'
            	}
	        }
	    })
        .state('common-layout.home', {
            url: '/home',
            views: {
            	'@': {
            		templateUrl: 'pages/home.html',
            		controller: 'homeController'
            	}
            }
        })
        .state('common-layout.gallery', {
            url: '/gallery',
            views: {
            	'@': {
            		templateUrl: 'pages/gallery.html',
            		controller: 'galleryController'
            	}
            }
        })
        .state('common-layout.login', {
            url: '/login',
            views: {
            	'@': {
            		templateUrl: 'pages/login.html',
                    controller: 'loginController'
            	}
            }
        })
        .state('common-layout.register', {
            url: '/reg',
            views: {
            	'@': {
            		templateUrl: 'pages/register.html',
                    controller: 'registerController'
            	}
            }
        })

        
        
    // layout for pages in application
        .state('app-layout', {
            abstract: true,
            url: '/app',
	        data: {
	        	requireLogin: false // TODO: change after proper login mechanism added
	        },
            views: {
            	'header': {
            		templateUrl: 'pages/app/header.html',
                    controller: 'headerController'
            	},
            	'footer': {
            		templateUrl: 'pages/app/footer.html',
            		controller: 'footerController'
            	}
            }
        })
        .state('app-layout.dash', {
        	url: '/dash',
        	views: {
        		'@': {
        			templateUrl: 'pages/app/dash.html',
            		controller: 'dashController'
        		}
        	}
        })
});



// state intercepter for login check
// make sure you add data: { requireLogin: true } to state for enable login check
app.run(function($rootScope, $state, $cookies, alertService) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;
		var currentUser = $cookies.getObject('HH_CURRENT_USER_CONTEXT');

		if (requireLogin && !currentUser) {
			event.preventDefault();
			alertService.add('danger',
					'YOU ARE NOT LOGGED-IN. Please login before proceed to '
							+ toState.url, 10000);
			$state.go('common-layout.login');
		} else if (currentUser && (toState.url === '/login' || toState.url === '/reg')) {
			event.preventDefault();
		}
		$(window).scrollTop(0);
	});
});