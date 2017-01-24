var express = require('express')
var app = require('../app')
var router = express.Router()

var asu = require('../asu')
var orgsync = require('../orgsync')

router.get('/events/all',function(req,res){
  asu.get(function(asu_result){
    orgsync.get(function(orgsync_result){
      res.json(orgsync_result.concat(asu_result))
    })
  })
})


module.exports = router
