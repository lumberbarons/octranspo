var octranspoUrl = 'https://api.octranspo1.com';
var apiVer = '/v1.2';

var routeSummary = '/GetRouteSummaryForStop';
var nextTrips = '/GetNextTripsForStop';
var nextTripsAllRoutes = '/GetNextTripsForStopAllRoutes';

var request = require('request');

var Octranspo = module.exports = function(options) {
    this.options = options || {};
}

Octranspo.prototype.getRouteSummaryForStop = function(stopNo, callback) {
    var data = {
        appID: this.options.appID,
        apiKey: this.options.apiKey,
        stopNo: stopNo,
        format: 'json'
    };
    
    getData(routeSummary, data, callback);
}

Octranspo.prototype.getNextTripsForStop = function(routeNo, stopNo, callback) {
    var data = {
        appID: this.options.appID,
        apiKey: this.options.apiKey,
        routeNo: routeNo,
        stopNo: stopNo,
        format: 'json'
    };
    
    getData(nextTrips, data, callback);
}

Octranspo.prototype.getNextTripsForStopAllRoutes = function(stopNo, callback) {
    var data = {
        appID: this.options.appID,
        apiKey: this.options.apiKey,
        stopNo: stopNo,
        format: 'json'
    };
    
    getData(nextTripsAllRoutes, data, callback);
}

function getData(resource, data, callback) {
    request.post(buildUrl(resource), function(err, response, body) {
        if(err) {
            callback(err);
        } else {
            callback(err, JSON.parse(body));
        }
    }).form(data);
}

function buildUrl(resource) {
    return octranspoUrl + apiVer + resource;
}