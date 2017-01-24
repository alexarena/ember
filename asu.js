//var db = require('./database')
var request = require('request')
var dt = require('./datetime')

exports.get = function(callback) {
    var uri = 'https://asuevents.asu.edu/api/event-search/all/' + dt.getDateString('today') + 'T00:00--3000-01-01T00:00?page=0'
    request({url: uri,json: true}, function(err, res, json) {
        if (!err) {
            var eventList = []
            for (var i = 0; i < json.nodes.length; i++) {
                var tempEvent = json.nodes[i].node
                var shortDesc = tempEvent.body_summary

                if (shortDesc.length > 140) {
                    shortDesc = shortDesc.substr(0, 140) + '…'
                }

                if (!tempEvent.start_date) {
                    tempEvent.start_date = ''
                }

                var cost = parseCost(tempEvent.event_price_level)
                var start = dt.parseASUDateTime(tempEvent.start_date).sql
                var end = dt.parseASUDateTime(tempEvent.end_date).sql
                var allDay = dt.parseASUDateTime(tempEvent.end_date).allDay

                var event = {
                    'title': tempEvent.title,
                    'short_desc': shortDesc,
                    'full_desc': tempEvent.body_summary,
                    'start': start,
                    'end': end,
                    'all_day': allDay,
                    'image': {
                        'src': tempEvent.event_image.src,
                        'alt': tempEvent.event_image.alt,
                    },
                    'location': tempEvent.location,
                    'tags': tempEvent.event_type, // Add interests to this as an arr
                    'price': cost,
                    'source_url': '',
                    'source': 'ASU Events' 

                }

                eventList.push(event)
            }
						if(callback){
							callback(eventList)
						}
        }
    })
}

// function getByPage(page,callback){
// 	var uri = 'https://asuevents.asu.edu/api/event-search/all/2016-11-18T00:00--3000-01-01T00:00?page=' + page
//     request({url: uri, json: true}, function(err, res, json) {
//     	if (!err) {
//     		for(var i=0; i<json.nodes.length; i++){
//     			var tempEvent = json.nodes[i].node
//
//     			var shortDesc = tempEvent.body_summary
//
//     			if(shortDesc.length > 140){
//     				shortDesc = shortDesc.substr(0, 140) + '…'
//     			}
//
//     			if(!tempEvent.start_date){tempEvent.start_date = ''}
//
//     			var cost = parseCost(tempEvent.event_price_level)
//
//     			var start = dt.parseASUDateTime(tempEvent.start_date).sql
//     			var end = dt.parseASUDateTime(tempEvent.end_date).sql
//     			var allDay = dt.parseASUDateTime(tempEvent.end_date).allDay
//
//     			var event = {
//     				'title': tempEvent.title,
//     				'short_desc': shortDesc,
//     				'full_desc': tempEvent.body_summary,
//     				'start': start,
//     				'end': end,
//     				'all_day': allDay,
//     				'image': {
//     					'src': tempEvent.event_image.src,
//     					'alt': tempEvent.event_image.alt,
//     				},
//     				'location': tempEvent.location,
//     				'tags': tempEvent.event_type, // Add interests to this as an arr
//     				'price': cost,
//     				'source_url': '',
//     				'source': 1 // 1 = From ASU
//
//     			}
//
//     			db.addIfUnique(event)
//     		}
//
//     	}
//     	else{
// 	    	console.log(err)
// 	}
//     })
// }
//
function parseCost(cost){
	if(cost.includes('free')){
		return 0
	}
	else return ''
}
