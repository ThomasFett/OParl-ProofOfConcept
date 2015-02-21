var request         = require('request');
var oparlSystemPath = 'https://politik-bei-uns.de/oparl';

module.exports = {

    fetchBodies: function(cb) {
        request(oparlSystemPath + '/body', function (error, response, body) {
            if (cb) {
                cb(JSON.parse(body));
            }
            console.log(body);
        });
    },
    fetchMeetings: function(bodyURL, cb) {
        request(bodyURL + "/meeting", function (error, response, body) {
            if (cb) {
                cb(JSON.parse(body));
            }
        });
    },
    fetchMeeting: function(MeetingURL, cb) {
        request(MeetingURL, function (error, response, body) {
            if (cb) {
                cb(JSON.parse(body));
            }
        });
    },
    fetchAgendaitemsForAgendaitem: function(agendaitemURL, cb) {
        request(agendaitemURL, function(error, response, body) {
            if (cb) {
                cb(JSON.parse(body));
            }
        });
    },
    fetchAgendaitem: function(agendaitemURL, cb) {
        request(agendaitemURL, function (error, response, body) {
            if (cb) {
                cb(JSON.parse(body))
            }
        });
    }
};