var test = require('tape');
var http = require('http');
var request = require('supertest');
var app = require('../app');

var validAuth = process.env.AUTHORIZATION_TOKEN;

app.set('env', 'test');

test('root page shows', function (t) {
	t.plan(1);

	request(app)
		.get('/')
		.expect(200)
		.expect('Content-Type', /text\/html/)
		.end(t.error);
});

test('returns 404 from non-existing path', function (t) {
	t.plan(1);

	request(app)
		.get('/non-existing-path')
		.expect(404)
		.end(t.error);
});

test('new message page shows', function (t) {
	t.plan(1);

	request(app)
		.get('/messages/new')
		.expect(200)
		.expect('Content-Type', /text\/html/)
		.end(t.error);
});

test('message creation fails correctly', function (t) {
	t.plan(3);

	request(app)
		.post('/messages')
		.expect(302)
		.expect('Location', '/messages/new?failure')
		.end(t.error);

	request(app)
		.post('/messages')
		.send('s')
		.expect(302)
		.expect('Location', '/messages/new?failure')
		.end(t.error);

	request(app)
		.post('/messages')
		.send('from=b&to[]=s&subject=a')
		.expect(302)
		.expect('Location', '/messages/new?failure')
		.end(t.error);
});

// will generate 3 assertions for each request it handles
function setupTestServer(t, handler, callback) {
	var token = 'arbitrary-non-existing-token';
	var originalUrl = app.get('service_url');
	var originalToken = app.get('service_token');

	var server = http.createServer(function (request, response) {
		t.equal(request.method, 'POST');
		t.equal(request.url, '/messages');
		t.equal(request.headers['authorization'], 'Bearer ' + token);

		body = '';

		request.on('data', function (chunk) {
			body += chunk;
		});

		request.on('end', function () {
			handler(request, response, body);
		});
	});

	server.listen(function () {
		var addr = server.address();
		var url = 'http://' + addr.address + ':' + addr.port;

		app.set('service_url', url);
		app.set('service_token', token);

		callback();
	});

	server.on('close', function () {
		app.set('service_url', originalUrl);
		app.set('service_token', originalToken);
	});

	return server;
}
