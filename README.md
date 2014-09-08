# mailer-app

`mailer-app` is a human-friendly front-end to [`mailer-service`](//github.com/billinghamj/mailer-service).

[![Build Status](https://img.shields.io/travis/billinghamj/mailer-app.svg?style=flat)](//travis-ci.org/billinghamj/mailer-app)
[![Coverage Status](https://img.shields.io/coveralls/billinghamj/mailer-app.svg?style=flat)](//coveralls.io/r/billinghamj/mailer-app)

## Installation

```bash
$ npm install
```

### Configuration

Requires the following environment variables:

- `MAILER_SERVICE_URL` - the base URL of the service (with no trailing slash)
- `MAILER_SERVICE_TOKEN` - authorization token for the service

Optionally, to disable debug output, etc.:

- `NODE_ENV` - set to `production`

`MAILER_SERVICE_TOKEN` must match the `AUTHORIZATION_TOKEN` on your instance of
the [mailer-service](//github.com/billinghamj/mailer-service#configuration).

## Running

```bash
$ npm start
```

## Testing

Run the tests (after installation):

```bash
$ npm test
```

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
