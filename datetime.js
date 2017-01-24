exports.parseASUDateTime = function(date) {
    var allDay = 0

    /*
    Examples From ASU:
    Nov 17 2016 - 9:30am
    Nov 16 2016 - 12:45pm
    Nov 16 2016 (All day)
    */

    var month = getFullMonth(date.substring(0, 3))
    var day = parseInt(date.substring(4, 6))
    var year = parseInt(date.substring(7, 11))
    var hours = 00
    var mins = 00

    if (date.includes('All day')) {
        allDay = 1
    } else {
        var time = date.substring(14)
        var sep = time.indexOf(':')

        hours = parseInt(time.substring(0, sep))
        mins = parseInt(time.substring(sep + 1, sep + 3))

        if (time.includes('pm')) {
            time = timeTo24hr(hours, mins, true)
            hours = time.h
        } else {
            time = timeTo24hr(hours, mins, false)
            hours = time.h
        }
    }

    var jsTime = new Date(month + ' ' + day + ', ' + year + ' ' + hours + ':' + mins + ':' + '00')
    var sqlTime = jsTime.toMysqlFormat()

    return ({
        'js': jsTime,
        'sql': sqlTime,
        'allDay': allDay
    })

}

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString()
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString()
    return d.toString()
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds())
}

function timeTo24hr(hour, min, pm) {
    if (pm == true) {
        if (hour >= 1 && hour < 12) {
            hour = hour + 12
        }
    } else if (hour == 12) {
        hour = hour - 12
    }

    return {
        'h': hour,
        'm': min
    }
}

function getFullMonth(month) {
    if (month == 'Feb') {
        return 'February'
    } else if (month == 'Mar') {
        return 'March'
    } else if (month == 'Apr') {
        return 'April'
    } else if (month == 'May') {
        return 'May'
    } else if (month == 'Jun') {
        return 'June'
    } else if (month == 'Jul') {
        return 'July'
    } else if (month == 'Aug') {
        return 'August'
    } else if (month == 'Sep') {
        return 'September'
    } else if (month == 'Oct') {
        return 'October'
    } else if (month == 'Nov') {
        return 'November'
    } else if (month == 'Dec') {
        return 'December'
    } else {
        return 'January'
    }
}

var debugDayOffest = 0
exports.getDateString = function(dayToGen) {
    var now = new Date(Date.now())
    var day = now.getDate()
    var month = now.getMonth()
    var year = now.getFullYear()

    //Debug offset
    day = day + debugDayOffest

    if (dayToGen != 'today') {
        day += 1
    }
    if (day < 10) {
        day = '0' + day
    }
    return year + '-' + month + 1 + '-' + day
}
