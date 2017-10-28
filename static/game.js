var socket = io();

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;

var context = canvas.getContext('2d');

var color = 'white';

socket.on('state', function(players) {
    // context.clearRect(0, 0, 800, 600);
    context.fillStyle = color;
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});

var pixelPosition = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
}

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 65: //A
            color = 'red';
            break;
        case 87: //W
            color = 'green';
            break;
        case 68: //D
            color = 'blue';
            break;
        case 83: //S
            color = 'white';
            break;
    }
});

document.addEventListener('mousemove', function(event) {
    pixelPosition.x = event.clientX;
    pixelPosition.y = event.clientY;
});

socket.emit('new player');
setInterval(function() {
    socket.emit('draw', pixelPosition)
}, 10);