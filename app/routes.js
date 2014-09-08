var httpClient = require('request');

module.exports = setup;

function setup(app) {
	app.get('/', index);
	app.get('/messages/new', messageNew);
	app.post('/messages', messageCreate);
}

function index(req, res) {
	res.render('index');
}

function messageNew(req, res) {
	var data = {
		failure: typeof req.query['failure'] !== 'undefined',
		success: typeof req.query['success'] !== 'undefined'
	};

	res.render('message_new', data);
}

function messageCreate(req, res) {
	if (!req.body.textBody)
		delete req.body.textBody;

	if (!req.body.htmlBody)
		delete req.body.htmlBody;

	httpClient({
		method: 'POST',
		url: req.app.get('service_url') + '/messages',
		auth: { bearer: req.app.get('service_token') },
		json: req.body
	}, function (error, response, body) {
		if (!error && response.statusCode == 201) {
			res.redirect('/messages/new?success');
		} else {
			res.redirect('/messages/new?failure');
		}
	});
}
