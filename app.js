var express = require('express');
var app = express();
var mongo = require('mongoose');

mongo.connect('mongodb://localhost/test');

/**     JSON API
{
	'user':{
		'name':String,
		'pointsCount':Number,
		'avatarURL':String
	},
	'game':{
		'name':String,
		'iconURL':String
	},
	'postMessage':String,
	'date':String
}

**/

var GCPostSchema = mongo.Schema({
	
		user:{ name:String, pointsCount:Number, avatarURL:String},
		game:{ name:String, iconURL:String},
		postMessage:String,
		date:String

});
var GCGameSchema = mongo.Schema({
	name:String, dev:String, currPoints:Number, maxPoints:Number , maxAch: Number, currAch:Number, iconURL:String, date:String
});

var GCFriendSchema = mongo.Schema({
	name:String,
	avatarURL:String,
	isMyFriend:Boolean
	
});


var GCPost = mongo.model('GCPosts', GCPostSchema);
var GCGame = mongo.model('GCGames', GCGameSchema);
var GCUser = mongo.model('GCUsers', GCFriendSchema);

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.static(__dirname + "/public"));

var getPosts = function(req, res){
	GCPost.find({}, function(err, gcPostList){
		res.json(gcPostList);
	})
};

var newPost = function(req, res){
	console.log(req.body);
	var temp = new GCPost(req.body);
	console.log(temp);
	temp.save(function(err,gcPostList){	
	});
};

var delPost = function(req, res){
	//console.log(req.body._id);
	GCPost.remove({'_id':req.body._id}, function(err, gcPostList){});
};




var getGames  = function(req, res){
	GCGame.find({}, function(err, gcGameList){
		res.json(gcGameList);
	})
};

var newGame = function(req, res){
	console.log(req.body);
	var temp = new GCGame(req.body);
	console.log(temp);
	temp.save(function(err, gcGameList){
		
	});
};

var delGame  = function(req, res){
	console.log(req.body._id);
	GCGame.remove({'_id':req.body._id}, function(err, gcGameList){});
}

var getUsers = function(req, res){
	GCUser.find({}, function(err, gcUserList){
		res.json(gcUserList);
	});
}

var newUser = function(req, res){
	//console.log(req.body);
	var temp = new GCUser(req.body);
	temp.save(function(err, gcUserList){});
}

var delUser = function(req, res){
	GCUser.remove({'_id':req.body._id}, function(err, gcUserList){});
}


var newFriend = function(req, res){
	//console.log(req.params.newFriendID);
	GCUser.findByIdAndUpdate(req.params.newFriendID, {$set:{'isMyFriend':true}}, function(err, gcUserRes){
		res.send(200);
	});
}

var getFriends = function(req, res){
	GCUser.find({'isMyFriend':true}, function(err, gcFriendList){
		res.json(gcFriendList);
	});
}


app.get('/posts', getPosts);
app.post('/posts', newPost);
app.post('/del', delPost);

app.get('/games', getGames);
app.post('/games', newGame);
app.post('/delGame', delGame);

app.get('/user', getUsers);
app.post('/user', newUser);
app.get('/user/friends', getFriends);
app.get('/user/friends/:newFriendID', newFriend);
app.post('/delUser', delUser);



app.get('/', function(req, res){});


app.listen(8000);
console.log('Listening on port 8000');