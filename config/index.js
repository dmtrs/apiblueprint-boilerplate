var nconf = require('nconf');
var util = require('util');

nconf.use('memory')
  .argv()
  .env()
  .file({
    file: util.format('%s/%s.yaml', __dirname, process.env.NODE_ENV || "dev"),
    format: require('nconf-yaml')
  })
  .load();

module.exports = nconf;
