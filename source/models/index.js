const user = require('./user').User;
const place = require('./place').Place;
const donor = require('./blood-donor').Donor;
const receiver = require('./blood-receiver').Receiver;
const geolocation = require('./geolocation').Geolocation;
const request = require('./request').Request;
const bloodGroup = require('./blood-group').BloodGroup;
const news = require('./news').News;
const event = require('./event').Event;

module.exports = {
    User: user,
    Place: place,
    Donor: donor,
    Receiver: receiver,
    Request: request,
    Geolocation: geolocation,
    BloodGroup: bloodGroup,
    News: news,
    Event: event,
};
