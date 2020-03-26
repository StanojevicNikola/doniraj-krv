const jwt = require('jsonwebtoken');
const utils = require('../utils');

class RestifyRouteHandler {
    constructor({
        logger, placeController, requestController, userController, infoController, config,
    }) {
        this.logger = logger;
        this.placeController = placeController;
        this.requestController = requestController;
        this.userController = userController;
        this.infoController = infoController;
        this.config = config;
    }

    async activateUser(req, res, next) {
        this.logger.info('Activate new user');
        console.log(req.params);
        const { activationId } = req.params;
        try {
            const result = await this.userController.activateUser(activationId);
            this._sendSuccess(res, result, null);
        } catch (e) {
            throw Error(e.message);
        }
        next();
    }

    async registerUser(req, res, next) {
        this.logger.info('New registration');
        const { email, password, name } = req.body;

        try {
            const result = await this.userController.registerUser(email, password, name);
            this._sendSuccess(res, result, null);
        } catch (e) {
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async logIn(req, res, next) {
        this.logger.info('Logging');
        const { username, password } = req.body;

        try {
            const tokenData = await this.userController.authorize(username, password);
            this._sendSuccess(res, 'Welcome', tokenData);
        } catch (e) {
            this._sendBadRequest(res, 'Authorization failed', null);
        }

        next();
    }

    async hello(req, res, next) {
        this.logger.info('Hello');
        this._sendSuccess(res, 'Success', { data: 'caocao' });
        next();
    }

    async findPlaces(req, res, next) {
        this.logger.info('findPlaces');
        const data = await this.placeController.find(req);
        if (data.length > 0) this._sendSuccess(res, 'Success', data);
        else {
            this._sendSuccess(res, 'Nema lokacija u trazenoj okolini!', {});
        }
        next();
    }

    async requestBlood(req, res, next) {
        this.logger.info('requestBlood');
        const donors = await this.requestController.publishRequest(req.body);
        this._sendSuccess(res, 'Mailovi su poslati na adrese', { donors });
        next();
    }

    async getCities(req, res, next) {
        this.logger.info('getCities');
        const data = await this.infoController.getCities();
        this._sendSuccess(res, 'Success', data);
        next();
    }

    async getNews(req, res, next) {
        this.logger.info('getNews');
        const data = await this.infoController.getNews();
        this._sendSuccess(res, 'Success', data);
        next();
    }

    async getEvents(req, res, next) {
        this.logger.info('getEvents');
        const data = await this.infoController.getEvents();
        this._sendSuccess(res, 'Success', data);
        next();
    }

    async getBloodGroups(req, res, next) {
        this.logger.info('getBloodGroups');
        const data = await this.infoController.getBloodGroups();
        this._sendSuccess(res, 'Success', utils.extract(data, 'groupType'));
        next();
    }

    async createUser(req, res, next) {
        this.logger.info('createUser');
        // TODO: handle errors and return value from controller
        const userId = await this.userController.createUserOld(req.body);
        this._sendSuccess(res, 'Success', {});
        next();
    }

    _sendResponse(res, status, responseData) {
        res.status(status);
        res.send({
            ...responseData,
            status,
            timestamp: (new Date()).toISOString(),
        });
    }

    _sendSuccess(res, message, data) {
        this._sendResponse(res, 200, { message, data });
    }

    _sendBadRequest(res, message, data) {
        this._sendResponse(res, 400, { message, data });
    }

    _sendUnauthorized(res, message, data) {
        this._sendResponse(res, 401, { message, data });
    }
}

module.exports = RestifyRouteHandler;
