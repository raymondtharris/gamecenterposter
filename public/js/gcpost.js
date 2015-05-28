var GCPoster = angular.module('GCPoster',['ngRoute']);

GCPoster.config(function($routeProvider){
	$routeProvider.when('/', {
	templateUrl:'/views/poster.html',
	controller:'GCPController'
	})
	.when('/games',{
		templateUrl:'/views/games.html',
		controller:'GCPGamesController'
	})
	.when('/friends',{
		templateUrl:'/views/friends.html',
		controller:'GCPFriendsController'
	})
});

GCPoster.controller('GCPController', function($scope, $http){
	$scope.games = [
	 	{'name':'Infinity Blade 3', 'src':'img/ib3.png'},
	 	{'name':'Real Racing 3', 'src':'img/rr3.png'},
	 	{'name':'Angry Birds', 'src':'img/ab.png'},
	 	{'name':'Jetpack Joyride', 'src':'img/jj.png'},
	 	{'name':'Letter Press', 'src':'img/lp.png'},
	 	{'name':'Hatch', 'src':'img/h.png'}
	];
	$scope.avatars = ['img/av1.jpg','img/av2.jpg', 'img/av3.png', 'img/av4.jpg'];
$scope.getFullSeconds = function(aDate){
		var seconds = aDate.getSeconds();
		if(seconds<10){
			seconds = "0"+ seconds;
		}
		else{
			seconds = seconds;
		}
		return seconds;
	}
	
	$scope.getFullHours = function(aDate){
		var hours =   aDate.getHours();
		if(hours<10){
			hours = "0"+ hours;
		}
		else{
			hours = hours;
		}
		return hours;
	}
	
	$scope.getFullMinutes = function(aDate){
		var minutes = aDate.getMinutes();
		if(minutes<10){
			minutes = "0"+ minutes;
		}
		else{
			minutes = minutes;
		}
		return minutes;
	}
	
	$scope.getFullOffset = function(aDate){
		var offset;
		if(aDate.getTimezoneOffset()<1000){
			offset = "0"+ aDate.getTimezoneOffset();
		}
		else{
			offset = aDate.getTimezoneOffset();
		}
		
		if(offset > 0){
			offset = "+" + offset;
		}
		
		return offset;
	}
	
	$scope.getFullMonth = function(aDate){
		var month = aDate.getMonth() + 1;
		if(month<10){
			month = "0"+ month;
		}
		else{
			month = month;
		}
		return month;
	}

	$scope.getFullDay = function(aDate){
		var day;
		if(aDate.getDate()<10){
			day = "0"+ aDate.getDate();
		}
		else{
			day = aDate.getDate();
		}
		return day;
	}
	$scope.gcPost={};
	$scope.posts=[];
	$http.get('/posts').success(function(data){
		$scope.posts= data;
	});
	
	$scope.package_post = function(){
		var d = new Date();
		var date = d.getUTCFullYear() +"-"+ $scope.getFullMonth(d) +"-"+ $scope.getFullDay(d) +" "+ $scope.getFullHours(d) +":"+ $scope.getFullMinutes(d) +":"+ $scope.getFullSeconds(d);
		$scope.gcPost.date = date;
		console.log($scope.gcPost);
		$http.post('/posts', $scope.gcPost).success(function(data){
			console.log(data);
		});
	}
	$scope.setGame = function(){
		//console.log(this.g.name + "   "+ this.g.src);
		$scope.gcPost.game={'name':this.g.name, 'iconURL':this.g.src};
	} 
	$scope.setAvatar = function(){
		//console.log(this.av);
		$scope.gcPost.user= {'avatarURL':this.av};
		
	}
	$scope.del = function(){
		console.log(this.po);
		$http.post('/del', this.po).success(function(data){
			console.log(data);
		});
	}
});

GCPoster.controller('GCPGamesController', function($scope, $http){
	$scope.gameList =[
	{'name':'Infinity Blade 3', 'src':'img/ib3.png','dev':'Epic Games','maxAch':243 , 'maxPoints':849738},
	{'name':'Real Racing 3', 'src':'img/rr3.png', 'dev':'FireMonkeys','maxAch':146 , 'maxPoints':754235},
	{'name':'Angry Birds', 'src':'img/ab.png', 'dev':'Rovio Games','maxAch':110 , 'maxPoints':44398},
	{'name':'Jetpack Joyride', 'src':'img/jj.png', 'dev':'HalfBrick Studios','maxAch':88 , 'maxPoints':6500},
	{'name':'Letter Press', 'src':'img/lp.png', 'dev': 'AteBits','maxAch':1 , 'maxPoints':100},
	{'name':'Hatch', 'src':'img/h.png', 'dev': 'RealMac Software','maxAch':24 , 'maxPoints':500}
	];
	
	//	game:{name:String, dev:String, currPoints:Number, maxPoints:Number , maxAch: Number, currAch:Number, iconURL:String}
	$scope.chosenGame = {};
	$scope.myGames= [];
	$scope.gameChosen = false;
	$scope.getFullSeconds = function(aDate){
		var seconds = aDate.getSeconds();
		if(seconds<10){
			seconds = "0"+ seconds;
		}
		else{
			seconds = seconds;
		}
		return seconds;
	}
	
	$scope.getFullHours = function(aDate){
		var hours =   aDate.getHours();
		if(hours<10){
			hours = "0"+ hours;
		}
		else{
			hours = hours;
		}
		return hours;
	}
	
	$scope.getFullMinutes = function(aDate){
		var minutes = aDate.getMinutes();
		if(minutes<10){
			minutes = "0"+ minutes;
		}
		else{
			minutes = minutes;
		}
		return minutes;
	}
	
	$scope.getFullOffset = function(aDate){
		var offset;
		if(aDate.getTimezoneOffset()<1000){
			offset = "0"+ aDate.getTimezoneOffset();
		}
		else{
			offset = aDate.getTimezoneOffset();
		}
		
		if(offset > 0){
			offset = "+" + offset;
		}
		
		return offset;
	}
	
	$scope.getFullMonth = function(aDate){
		var month = aDate.getMonth() + 1;
		if(month<10){
			month = "0"+ month;
		}
		else{
			month = month;
		}
		return month;
	}

	$scope.getFullDay = function(aDate){
		var day;
		if(aDate.getDate()<10){
			day = "0"+ aDate.getDate();
		}
		else{
			day = aDate.getDate();
		}
		return day;
	}

	
	$scope.addGame = function(){
		$scope.gameChosen = true;
		//console.log(this.game);
		var d = new Date();
		console.log(d);
		console.log(d.getUTCFullYear() +"-"+ $scope.getFullMonth(d) +"-"+ $scope.getFullDay(d) +" "+ $scope.getFullHours(d) +":"+ $scope.getFullMinutes(d) +":"+ $scope.getFullSeconds(d) );
		$scope.chosenGame = this.game;
	}
	$scope.loadData = function(){
		$http.get('/games').success(function(data){
		$scope.myGames = data;
		//console.log(data);
	});
	}
	$scope.loadData();
	$scope.checkGreater = function(check, maxval){
	//console.log('checking greater');
	//console.log(check);
		if(check > maxval){
			return maxval;
			}
		else
			return check;
	}
	
	$scope.postGame  = function(){
		var d = new Date();
		var date = d.getUTCFullYear() +"-"+ $scope.getFullMonth(d) +"-"+ $scope.getFullDay(d) +" "+ $scope.getFullHours(d) +":"+ $scope.getFullMinutes(d) +":"+ $scope.getFullSeconds(d);
		var name = $scope.chosenGame.name;
		var dev = $scope.chosenGame.dev;
		var iconURL = $scope.chosenGame.src;
		var maxPoints = $scope.chosenGame.maxPoints;
		var maxAch = $scope.chosenGame.maxAch;
		var currPoints = $scope.checkGreater(this.currPoints, $scope.chosenGame.maxPoints);
		var currAch  = $scope.checkGreater(this.currAch,$scope.chosenGame.maxAch );
		
		var tempGame = {'name': name, 'dev': dev, 'currPoints':parseInt(currPoints), 'maxPoints':maxPoints, 'maxAch':maxAch, 'currAch':parseInt(currAch), 'iconURL':iconURL, 'date':date};
		$http.post('/games', tempGame).success(function(){
			$scope.loadData();
		});
	}
	$scope.delGame = function(){
		console.log(this.mine);
		$http.post('/delGame', this.mine).success(function(){
			$scope.loadData();
		});
	}
	
		
	
});


GCPoster.controller('GCPFriendsController', function($scope,$http){
	$scope.avatars = ['img/av1.jpg','img/av2.jpg', 'img/av3.png', 'img/av4.jpg','img/av5.jpeg','img/av6.jpg', 'img/av7.png', 'img/av8.jpg', 'img/av9.png', 'img/av10.jpg'];
	$scope.newUser = {};
	$scope.theUsers= [];
	$scope.setAvatarURL = function(){
		$scope.newUser.avatarURL = this.av;
	}

	$scope.AddUser = function(){
		$scope.newUser.name = $scope.name;
		$scope.newUser.isMyFriend = false;
		//console.log($scope.newUser);
		$http.post('/user', $scope.newUser).success(function(){
			
		});
	}
	$http.get('/user').success(function(data){
		//console.log(data);
		$scope.theUsers = data; 
	});
	
	$scope.delUser = function(){
		//console.log(this.ua);
		$http.post('/delUser', this.ua).success(function(){});
	}

});