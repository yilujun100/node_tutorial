// express 中的中间件是什么？用一句话来概括，中间件本身是一种封装，对什么的封装，对你的请求或者是处理流程当中的某一小块逻辑的封装
// 在你整个的请求返回的生命周期里面，给你依次去访问的这么一个方法，你可以对里面的request、response去做一些处理，处理完之后，调用
// next就会把处理权交给下一个中间件。中间件封装了整个复杂流程逻辑中的一部分，而且这部分的影响会在整个http请求的生命周期当中起到它
// 的作用
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

/* app.use(require('./middlewares/auth'))

app.use((req, res, next) => {
    req.duang = 'duang'
    next('something wrong')
})

app.use((req, res) => {
    console.log(`req.duang: ${req.duang}`)
    res.end('hello my express demo!')
}) */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.middlewares = [];
	next();
});

function mw1(options) {
	return function (req, res, next) {
		req.middlewares.push('mw1');
		next();
	};
}

function mw2(req, res, next) {
	req.middlewares.push('mw2');
	next();
}

function mw3(req, res, next) {
	req.middlewares.push('mw3');
	res.end(JSON.stringify(req.middlewares));
}

// 中间件注册方式
/* app.use(mw1)
app.use(mw2)
app.use(mw3) */
// app.use(mw1, mw2, mw3)
// app.use([mw1, mw2], mw3)
// app.use(mw1(), [mw2, mw3])
app.use('/', mw1());
app.get('/article', mw2);
app.post('/user', mw2);
app.use(mw3);

// 错误中间件
app.use((err, req, res, next) => {
	res.end(err);
});

const server = http.createServer(app);

server.listen('8888');
