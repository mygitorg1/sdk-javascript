var axios = require("axios");

function HTTPBinary(configuration){
  this.config = JSON.parse(JSON.stringify(configuration));

  this.config["headers"] = {
    "Content-Type":"application/json; charset=utf-8"
  };
}

HTTPBinary.prototype.emit = function(cloudevent){

  // Create new request object
  var _config = JSON.parse(JSON.stringify(this.config));

  // Always set stuff in _config
  var _headers = _config["headers"];

  // OPTIONAL CONTENT TYPE ATTRIBUTE
  if(cloudevent.getContenttype()) {
    _headers["Content-Type"] = cloudevent.getContenttype();
  }

  // REQUIRED ATTRIBUTES
  _headers["CE-EventType"] = cloudevent.getType();
  _headers["CE-CloudEventsVersion"] = cloudevent.getSpecversion();
  _headers["CE-Source"] = cloudevent.getSource();
  _headers["CE-EventID"] = cloudevent.getId();

  // OPTIONAL ATTRIBUTES
  if(cloudevent.getEventTypeVersion()) {
    _headers["CE-EventTypeVersion"] = cloudevent.getEventTypeVersion();
  }
  if(cloudevent.getTime()) {
    _headers["CE-EventTime"] = cloudevent.getTime();
  }
  if(cloudevent.getSchemaurl()) {
    _headers["CE-SchemaURL"] = cloudevent.getSchemaurl();
  }

  // Set the cloudevent payload
  _config["data"] = cloudevent.format().data;

  // EXTENSION CONTEXT ATTRIBUTES
  var exts = cloudevent.getExtensions();
  for(var ext in exts){
    if({}.hasOwnProperty.call(exts, ext)){
      let capsExt = ext.charAt(0).toUpperCase() + ext.slice(1)
      _headers["CE-X-" + capsExt] = exts[ext];
    }
  }

  // Return the Promise
  return axios.request(_config);
};

module.exports = HTTPBinary;