var express = require('express');
var router = express.Router();
var oparlFetcher = require('../model/oparlFetcher');
var oparlDataParser = require('../model/oparlDataParser');

/* Fetch data from the external OParl mock server and display it */

var urlFixer = function(url) {
    return url.replace('?html=1', '');
};

var handleFetchedBodiesData = function(data) {
    // hard coded: The element with index 2 is used
    var fixedURL = urlFixer(data[2]);

    oparlFetcher.fetchMeetings(urlFixer(data[2]), handleFetchedMeetingsData);
};

var handleFetchedMeetingsData = function(data) {
    console.log(data.length);

    // set filterdate
    var filterDate = new Date();
    filterDate.setFullYear(filterDate.getFullYear(), filterDate.getMonth() - 1);

    oparlDataParser.checkMeetingsForDateAfter(data, filterDate, handleFilteredMeetings);
};

var handleFilteredMeetings = function(data) {
    var agendaitemLists = [];

    console.log(data.length);

    for (var i = data.length - 1; i >= 0; i--) {
        agendaitemLists.push(data[i].agendaItem);
    };

    oparlDataParser.createListOfAgendaitems(agendaitemLists, handleAgendaItemList);
};

var handleAgendaItemList = function(data) {
    console.log(data.length);
    // console.log(data);
        
    oparlDataParser.checkAgendaitemsForKeywords(data, ["Fahrrad", "Radfahrer", "Fahrradfahrer"], handleFilteredAgendaitems);
};

var handleFilteredAgendaitems = function(data) {

    // The result is displayed in the console.
    console.log(data);
};

router.get('/', function(req, res, next) {
    
    oparlFetcher.fetchBodies(handleFetchedBodiesData);

    res.render('bikes', {
        title: 'Bikes',
        introduction: 'Die Ergebnisse werde in der Konsole abgebildet.'
    });
});

module.exports = router;
