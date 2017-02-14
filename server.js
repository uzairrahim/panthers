require('dotenv').config();

var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var port = process.env.PORT || 3000;
var path    = require("path");
var queries = require('./server/queries');
var utils = require('./server/utils');

var connection;

var connection_config = {
	host : process.env.HOST,
	user : process.env.USERNAME,
	password : process.env.PASSWORD,
	database : process.env.DATABASE
}

function handleDisconnect(){
	connection = mysql.createConnection(connection_config);

	connection.on('error', function(e){
		if(!e.fatal) return;
		if(e.code == 'PROTOCOL_CONNECTION_LOST'){
			handleDisconnect();
		}
	});

	return connection;
}

handleDisconnect();

var app = express();
app.use(parser.urlencoded({extended : true}));
app.use(parser.json());
app.use(express.static('public'));

function sendResponse(req, res, next, error, rows, fields){
	if(error){
		res.send(utils.getErrorResponse(error.code));
	}else{
		res.send(utils.getSuccessResponse(rows));
	}
	next();
}

// Temporary fix to serve image
app.get('/public/js/avatar.svg', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/js/avatar.svg'));
});

app.get('/public/js/menu.svg', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/js/menu.svg'));
});

app.get('/public/js/check.svg', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/js/check.svg'));
});

// Serve static index page from the root route.
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

// Get teams
app.get('/api/teams', function(req, res, next){
	connection.query(queries.SELECT_TEAMS, function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get grounds
app.get('/api/grounds', function(req, res, next){
	connection.query(queries.SELECT_GROUNDS, function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get seasons
app.get('/api/seasons', function(req, res, next){
	connection.query(queries.SELECT_SEASONS, function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get current seasons
app.get('/api/seasons/current', function(req, res, next){
	connection.query(queries.SELECT_CURRENT_SEASONS, function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get standings
app.get('/api/standings', function(req, res, next){
	// required: season id, conference id
	connection.query(queries.SELECT_STANDINGS, [28, 2], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get upcoming fixtures
app.get('/api/fixtures', function(req, res, next){
	// required: season ids, team id
	connection.query(queries.SELECT_FIXTURES, [28, 29, utils.getTeamID(), utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get recent results
app.get('/api/results', function(req, res, next){
	// required: team id, season ids
	connection.query(queries.SELECT_RESULTS, [utils.getTeamID(), utils.getTeamID(), 28, 29], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get all active players
app.get('/api/players', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_ALL_PLAYERS, [utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get all time batting details
app.get('/api/players/batting/all', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_ALL_BATTING_DETAILS, [utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get all time bowling details
app.get('/api/players/bowling/all', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_ALL_BOWLING_DETAILS, [utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get current batting details
app.get('/api/players/batting/current', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_CURRENT_BATTING_DETAILS, [utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get current bowling details
app.get('/api/players/bowling/current', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_CURRENT_BOWLING_DETAILS, [utils.getTeamID()], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get season batting details
app.get('/api/players/batting/season/:id', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_BATTING_DETAILS_BY_SEASON, [utils.getTeamID(), req.params.id], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});

// Get season bowling details
app.get('/api/players/bowling/season/:id', function(req, res, next){
	// required: team id
	connection.query(queries.SELECT_BOWLING_DETAILS_BY_SEASON, [utils.getTeamID(), req.params.id], function(error, rows, fields){
		sendResponse(req, res, next, error, rows, fields);
	});
});


app.listen(port, function(){
	console.log('App is listening to port ' + port);
});