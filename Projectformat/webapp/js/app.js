var app = angular.module('ngApp', ['ui.router', 'ngCookies', 'ui.bootstrap', 'util']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
            	'@': {
            		templateUrl: 'pages/login.html',
            		controller: 'loginController'
            	}
            }
        })
        .state('register', {
            url: '/reg',
            views: {
            	'@': {
            		templateUrl: 'pages/register.html',
                    controller: 'registerUserController'
            	}
            }
        })
        
        // layout for all pages except login and register
        .state('layout', {
            abstract: true,
            views: {
            	'header': {
            		templateUrl: 'pages/header.html',
                    controller: 'headerController'
            	},
            	'footer': {
            		templateUrl: 'pages/footer.html',
            		controller: 'footerController'
            	}
            }
        })
        .state('layout.dash', {
        	url: '/dash',
        	views: {
        		'@': {
        			templateUrl: 'pages/dash.html',
            		controller: 'dashController'
        		}
        	}
        })
    
     .state ('layout.text',{
        url:'/text',
        views :{
          '@' :{ templateUrl: 'pages/text.html',
            controller: 'textController'
               }
        }
    })
});