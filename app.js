
var net = require('net');
var os = require("os");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var http_host = os.hostname() + '.local';
var http_port = 1337;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

server.listen(http_port);
console.log('http server listening...' + http_host + ':' + http_port);

var TCP_HOST = '127.0.0.1';
var TCP_PORT = 3000;
var TCP_client = new net.Socket();

TCP_client.connect(TCP_PORT, TCP_HOST, function() {
	console.log('Arduino sketch connected to...: ' + TCP_HOST + ':' + TCP_PORT);
});

io.on('connection', function(client){
	client.on('message', function(data) {
		console.log(data);
		TCP_client.write(data);
	});
});