angular
	.module('vffApp',['ngMaterial'])
	.controller('vffCtrl', function ($scope, $mdSidenav, $mdDialog, $mdMedia) {
		$scope.mainImages = [
			{name: 'ABOUT US', src: 'images/grid1.jpg'},
			{name: 'LIBRARY', src: 'images/grid2.jpg'},
			{name: 'ROLLER SHADES', src: 'images/grid3.jpg'},
			{name: 'BEDDING', src: 'images/grid4.jpg'},
			{name: 'FABRIC COLLECTIONS', src: 'images/grid5.jpg'},
			{name: 'WEAVE UP', src: 'images/grid6.jpg'},
			{name: 'MEDIA', src: 'images/grid7.jpg'},
			{name: 'CONTACT', src: 'images/grid8.jpg'}
		];
  
		$scope.mainMenu = [
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
		
		$scope.selectedMenu = $scope.mainMenu;
		$scope.selectMenu = function(menu){
			if(menu.menu)
				$scope.selectedMenu = menu.menu;
			else
				alert(1);
		};		
		
		$scope.toggleMenu = function() {
			this.selectedMenu = this.mainMenu;
			$mdSidenav('menu').toggle();
		}
		
		$scope.showLogin = function(ev) {
			$mdDialog.show({
				templateUrl: 'views/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: true,
				openFrom: '#login_button',
				closeTo: '#login_button',
				disableParentScroll : false
			});
		};
	})
	.run(function(){
			console.log('MyApp is ready');
	});