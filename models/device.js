var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var config = require('../config/configuration');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection(config.host + ':' + config.port + '/' + config.collection);

var DeviceSchema = new Schema({  
  email: {
      type: String,
      required: true
  }
});

module.exports = connection.model('Device', DeviceSchema);
