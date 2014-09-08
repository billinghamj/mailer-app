var test = require('tape');
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
