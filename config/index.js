var nconf = require('nconf');
var format = require('nconf-yaml');
var util = require('util');

var file = util.format('%s/%s.yaml', __dirname, process.env.NODE_ENV || "dev");

nconf.use('memory')
  .argv()
  .env()
  .file({ file, format })
  .load();

module.exports = nconf;
