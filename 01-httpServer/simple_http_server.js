// http://baidu.com
// https://yao.tmall.com/?spm=a21bo.21814703.201862-1.d1.5af911d9auNiFm&acm=lb-zebra-148799-667861.1003.4.2429983&scm=1003.4.lb-zebra-148799-667861.OTHER_14561829993617_2429983
// Uniform Resource Locator
// Schema://host:port/path?query#hash

// port 22: ssh, 80: http, 443: https 27017: mongodb
// const url = `address://gaoxin.chengdu.china:8888/keyuanroad/3`
// ?a=1&b=2&c=3
// HTTP请求第一部分（第一行）   GET /index/ HTTP/1.1

// HTTP方法 GET POST PATCH PUT DELETE OPTIONS HEAD

// path: /user get:获取所有用户 post:创建用户 patch:修改用户信息 put:创建 delete:删除 options:列举可进行的操作 head:返回head信息

// HTTP请求头：第二行到空行之前
// 重要的键值对：
// Content-Type: 请求体的类型（编码、格式等）
// Content-Length: 请求体的长度
// Accept: 能够接受的返回体类型
// Cookie: cookie

// http请求体和请求头以一个空行作为分隔符

// HTTP第三部分：请求体 http-request/response-body
// 请求体的格式、编码通常由请求头里的content-type指定，可能会很大
const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const server = http.createServer();
server.listen(8808);

const users = [];

server.on('request', (request, response) => {
	const url = request.url;
	const path = url.substr(0, url.indexOf('?'));
	const queryString = url.substr(url.indexOf('?') + 1, url.length);
	const query = qs.parse(queryString);

	switch (path) {
		case '/user':
			switch (request.method) {
				case 'GET':
					response.statusCode = 200;
					response.end(JSON.stringify(users));
					break;
				case 'POST':
					/* const user = { name: Math.floor(Math.random() * 100) };
					users.push(user);
					response.statusCode = 200;
					response.end(JSON.stringify(user)); */
					const contentType = request.headers['content-type'];

					if (contentType !== 'application/json') {
						response.statusCode = 400;
						response.end('error');
					}

					let requestBodyStr = '';
					request.on('data', function (data) {
						requestBodyStr += data.toString();
					});
					request.on('end', function () {
						const user = qs.parse(requestBodyStr);
						users.push(user);
						response.statusCode = 200;
						response.end(JSON.stringify(user));
					});
					break;
			}
			break;
		case '/test.html':
			response.statusCode = 200;
			fs.createReadStream('./test.html').pipe(response);
			break;
		default:
			response.statusCode = 404;
			response.end('NOT_FOUND');
			break;
	}
});
