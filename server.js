var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var players = {};
io.on('connection', function(socket) {
    socket.on('new player', function() {
        console.log('New guy: ', socket.id);
        players[socket.id] = {
            x: 300,
            y: 300
        }
    });
    socket.on('draw', function(pixelPosition) {
        var player = players[socket.id] || {};
        player.x = pixelPosition.x;
        player.y = pixelPosition.y;
    });
});

setInterval(function() {
    io.sockets.emit('state', players);
}, 1000/60);


app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(5000, function() {
    console.log('Starting server on port 5000');
});
