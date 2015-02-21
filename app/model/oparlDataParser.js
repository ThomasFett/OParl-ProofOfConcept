/**
 * This module makes a request for each given url and adds the object to the result array, if the requested condition fits
 */
var oparlFetcher = require('../model/oparlFetcher');

var result;

module.exports = {

    checkMeetingsForDateAfter: function(itemURLs, filterDate, cb) {
        var i;
        var checkCounter = itemURLs.length;

        result = [];

        for (i = itemURLs.length - 1; i >= 0; i--) {
            
            oparlFetcher.fetchMeeting(itemURLs[i], function(response) {

                // check the result for the date to filter

                if (Date.parse(response.start) > filterDate) {
                    result.push(response);
                }

                checkCounter--;
                if (checkCounter === 0) {
                    cb(result);
                }
            })
        };
    },
    createListOfAgendaitems: function(agendaitemLists, cb) {
        var i;
        var checkCounter = agendaitemLists.length;

        result = [];

        for (i = agendaitemLists.length - 1; i >= 0; i--) {
            
            oparlFetcher.fetchAgendaitemsForAgendaitem(agendaitemLists[i], function(response) {

                // console.log(response);

                for (var j = response.length - 1; j >= 0; j--) {
                    result.push(response[j]);
                };

                checkCounter--;
                if (checkCounter === 0) {
                    cb(result);
                }
            });
        };
    },
    checkAgendaitemsForKeywords: function(agendaitemList, keywords, cb) {
        var i;
        var checkCounter = agendaitemList.length;

        result = [];

        for (i = agendaitemList.length - 1; i >= 0; i--) {

            oparlFetcher.fetchAgendaitem(agendaitemList[i], function(response) {

                for (var j = keywords.length - 1; j >= 0; j--) {

                    if (response.name) {
                        if (response.name.indexOf(keywords[j]) > -1) {
                            result.push(response);
                        }
                    }
                };

                checkCounter--;
                if (checkCounter === 0) {
                    cb(result);
                }
            });
        };
    }
};