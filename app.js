var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json() )        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

var api = require('./routes/api')
app.use('/', api)

module.exports = app
