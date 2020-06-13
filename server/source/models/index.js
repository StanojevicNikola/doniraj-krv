const user = require('./user').User;
const place = require('./place').Place;
const donor = require('./blood-donor').Donor;
const recipient = require('./blood-recipient').Recipient;
const geolocation = require('./geolocation').Geolocation;
const request = require('./request').Request;
const blood = require('./blood-group').Blood;
const news = require('./news').News;
const event = require('./event').Event;
const token = require('./token').Token;
const activation = require('./activation').Activation;
const transaction = require('./transaction').Transaction;
const storage = require('./storage').Storage;

module.exports = {
    User: user,
    Place: place,
    Donor: donor,
    Recipient: recipient,
    Request: request,
    Geolocation: geolocation,
    Blood: blood,
    News: news,
    Event: event,
    Token: token,
    Activation: activation,
    Transaction: transaction,
    Storage: storage,
};
