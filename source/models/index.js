const user = require('./user').User;
const place = require('./place').Place;
const donor = require('./blood-donor').Donor;
const receiver = require('./blood-receiver').Receiver;
const geolocation = require('./geolocation').Geolocation;
const request = require('./request').Request;
const blood = require('./blood-group').Blood;
const news = require('./news').News;
const event = require('./event').Event;
const token = require('./token').Token;

module.exports = {
    User: user,
    Place: place,
    Donor: donor,
    Receiver: receiver,
    Request: request,
    Geolocation: geolocation,
    Blood: blood,
    News: news,
    Event: event,
    Token: token,
};
