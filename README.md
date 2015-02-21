# OParl-ProofOfConcept
This project is a proof of concept for a simple use case using the OParl standard.

## What's this project all about?
Currently the OParl standard is being developed. This standard is an API which should enable easier access to RIS (Ratsinformationssystemen) throughout Germany.

This project implements a simple use case to test the possibilities and usability of the OParl API.

## Project Idea
The implemented web server searches for all information that can be found to a certain topic (e.g. "Fahrrad / Radfahrer / etc.") in a specific time range (e.g. last two years).

The OParl standard hasn't been released yet, but there is a dummy implementation on [https://politik-bei-uns.de/oparl](https://politik-bei-uns.de/oparl) which serves scraped data for the cities  Bochum, Köln and Moers via the OParl API. This service is used for the project.

## Outcome
The finally fetched result is for the time being only displayed in the logs of the process.
Because of the excessive time usage for the thousands of requests needed to find results for a long term search, the search is only limited to the data from the last month.

## Recap
This task was really annoying to fulfill because of the missing filter functionality:
1) All meeting URLs for a certain body have to be fetched
2) All these meeting items have to be checked for their "start"-property (1616 requests!)
3) For all meetings that fulfill the conditions the list of agendaitems have to be fetched (26 requests)
4) Each of the collected agendaitems need to be fetched, to check them for the search keywords (1178 requests!)
5) Only now the wanted information is retrieved. When a longer time period than 1 month is checked, the number of requests grow accordingly.  

My conclusion is that the OParl API needs a proper and well working filter system for all requests or else the data provided by the API is not usable for using it in a simple client.
