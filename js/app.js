angular
	.module('vffApp',['ngMaterial'])
	.controller('vffCtrl', function ($rootScope, $scope, $mdSidenav, $mdDialog, $mdPanel, $mdMedia) {
		var self = this;
		$scope.$mdMedia = $mdMedia;
		$rootScope.mainImages = [
			{name: 'ABOUT US', src: 'images/grid1.jpg'},
			{name: 'LIBRARY', src: 'images/grid2.jpg'},
			{name: 'ROLLER SHADES', src: 'images/grid3.jpg'},
			{name: 'BEDDING', src: 'images/grid4.jpg'},
			{name: 'FABRIC COLLECTIONS', src: 'images/grid5.jpg'},
			{name: 'WEAVE UP', src: 'images/grid6.jpg'},
			{name: 'MEDIA', src: 'images/grid7.jpg'},
			{name: 'CONTACT', src: 'images/grid8.jpg'}
		];
  
		
		$rootScope.mainMenu = [
			{name: 'VALLEY FORGE', link: ''},
			{name: 'LIBRARY', link: ''},	
			{
				name: 'PRODUCTS',
				menu: [
					{name: 'FABRIC COLLECTIONS', link: ''},
					{name: 'WEAVEUP', link: ''},
					{name: 'ROLLER SHADES', link: ''},
					{name: 'REVL', link: ''},
					{name: 'TENCEL PLUS', link: ''},
					{name: 'FRESH', link: ''}
				]
			},
			{name: 'MEDIA', link: ''},
			{name: 'CAREERS', link: ''},
			{name: 'CONTACT', link: ''}		
		];
		$rootScope.parentMenu = $rootScope.mainMenu;
		
		$rootScope.splashImages = [
			{src: 'images/SplashImage_01.jpg'},
			{src: 'images/SplashImage_02.jpg'}
		];
		
		$scope.selectedMenu = $scope.mainMenu;
		$scope.selectMenu = function(menu){
			if(menu.menu){
				$scope.selectedMenu = menu.menu;
				$scope.parentMenu = menu;
			}
			else
				alert("Navigate to specific link...");
		};
		$scope.backMenu = function(){
			$scope.selectedMenu = $rootScope.mainMenu;
			$scope.parentMenu = $rootScope.mainMenu;
		};
		
		$scope.toggleMenu = function() {
			this.selectedMenu = this.mainMenu;
			$mdSidenav('menu').toggle();
		}
		$scope.sidenavDisplayed = function(){return $mdSidenav('menu').isOpen();};
		
		this.showLogin = function(ev) {
			$mdDialog.show({
				templateUrl: 'views/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: true,
				openFrom: '#login_button',
				closeTo: '#login_button'
			});
		};
		
		this.showSplash = function() {
			var config = {
				attachTo: angular.element(document.body),
				controller: function ($rootScope, $scope, mdPanelRef) {
							$scope.splashImages = $rootScope.splashImages;
							$scope.closeSplash = function() {
								mdPanelRef.close();
								clearTimeout($rootScope.timer);
								clearTimeout($rootScope.subTimer);
							}
						},
				controllerAs: 'ctrl',
				disableParentScroll: true,
				templateUrl: 'views/splash.html',
				hasBackdrop: true,
				panelClass: 'splash',
				position: $mdPanel.newPanelPosition().absolute().center(),
				trapFocus: true,
				zIndex: 150,
				clickOutsideToClose: true,
				escapeToClose: true,
				focusOnOpen: true
			  };
  
			var current;
			var $images;
			$mdPanel.open(config)
					.then(function(result) {
						$images = $('#images li');
						current = 1;
						$images.each(function(){
							var $img = $(this).find('img');
							$(this).css({
								'background-image' : 'url('+$img.attr('src')+')'
							});
							$img.css('display','none');
						});
						$images.eq(current).addClass('current');
						start();
			});
	
			function start(){
				$rootScope.timer = setTimeout(function(){
					var old = current;
					$images.eq(old).addClass('hide');
					$rootScope.subTimer = setTimeout(function(){
						$images.eq(old).removeClass('current hide');
					},2200)
					current = (current+1)%2;
					$images.eq(current).addClass('current');

					start();

				}, 5000);
			}
			
			
		}
	})	
	.directive('ngMouseWheelDown', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel MozMousePixelScroll wheel", function(event) {
						scope.closeSplash();
                        // cross-browser wheel delta
                        var event = window.event || event; // old IE support
                        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
						
                        if(delta < 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelDown);
                            });
                        
                            // for IE
                            event.returnValue = false;
                            // for Chrome and Firefox
                            if(event.preventDefault)  {
                                event.preventDefault();
                            }

                        }
            });
        };
	})
	.run(function(){
			console.log('MyApp is ready');
	});