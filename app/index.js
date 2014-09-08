var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('service_url', process.env.MAILER_SERVICE_URL);
app.set('service_token', process.env.MAILER_SERVICE_TOKEN);

app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.all('*', function (req, res) {
	res.status(404).end();
});

module.exports = app;

/* istanbul ignore if : not used during unit testing */
if (require.main === module) {
	var server = http.createServer(app);
	var port = app.get('port');

	server.listen(port, function () {
		console.info('Express server listening on port ' + app.get('port'));
	});
}
