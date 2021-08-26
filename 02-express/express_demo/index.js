const express = require('express');
const http = require('http');
const app = express();

app.use((req, res, next) => {
	console.log('oh you got middleware no.1');
	next();
});

app.use((req, res) => {
	console.log('oh you got middleware no.2');
	res.end('hello my express demo!');
});

const server = http.createServer(app);

server.listen('8888');
