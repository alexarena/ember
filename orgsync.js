var request = require('request')
var dt = require('./datetime')
require('dotenv').config()

const apiKey = process.env.ORGSYNC_API_KEY

var apiURL = 'https://api.orgsync.com/api/v3/communities/234/events?key='+apiKey+'&upcoming=true&per_page=100&after=' + dt.getDateString('today') + '&before=' + dt.getDateString('tomorrow') + '&include_opportunities=true'

exports.get = function(callback) {
    request({
        uri: apiURL,
        json: true
    }, function(err, res, json) {
        json = json.data
        //	console.log(json)
        var eventList = []
        //console.log(json[0].description)
        for (var i = 0; i < json.length; i++) {
            var oldEvent = json[i]

            var shortDesc = oldEvent.description
            if (shortDesc.length > 140) {
                shortDesc = shortDesc.substr(0, 140) + '…'
            }
            var event = {
                'title': oldEvent.title,
                'short_desc': shortDesc,
                'full_desc': oldEvent.description,
                'start': oldEvent.dates[0].starts_at,
                'end': oldEvent.dates[0].ends_at,
                'all_day': oldEvent.is_all_day,
                'image': {
                    'src': oldEvent.thumbnail_url,
                    'alt': null,
                },
                'location': oldEvent.location,
                'tags': oldEvent.category.name,
                'price': null,
                'source_url': oldEvent.links.web,
                'source': 'OrgSync' // 1 = From ASU

            }
            eventList.push(event)
        }
        if (callback) {
            callback(eventList)
        }
    })
}
