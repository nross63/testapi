var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~0.1'
});

client.get('/picture/test', function (err, req, res, obj) {
  assert.ifError(err);
  console.log('Server returned: %j', obj);
});