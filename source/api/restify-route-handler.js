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
        const { activationId } = req.params;
        try {
            const result = await this.userController.activateUser(activationId);
            this._sendSuccess(res, result, {});
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async registerUser(req, res, next) {
        this.logger.info('New registration');
        const {
            email, password, username, name,
        } = req.body;

        try {
            const result = await this.userController.registerUser(email, password, username, name);
            this._sendSuccess(res, result, null);
        } catch (e) {
            this.logger.error(e.message);
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
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
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
        try {
            const data = await this.placeController.find(req);
            if (data.length > 0) this._sendSuccess(res, 'Success', data);
            else {
                this._sendSuccess(res, 'Nema lokacija u trazenoj okolini!', {});
            }
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async requestBlood(req, res, next) {
        this.logger.info('requestBlood');
        const rawToken = utils.extractToken(req);
        const tokenData = utils.decodeToken(rawToken);
        const {
            radius, city, queryType, groups, places,
        } = req.body;
        const { recipient } = tokenData;
        const donors = await this.requestController
            .publishRequest(radius, city, recipient, queryType, groups, places);
        this._sendSuccess(res, 'Kompatibilni donori su obavesteni o Vasem zahtevu!', { donors });
        next();
    }

    async getCities(req, res, next) {
        this.logger.info('getCities');
        try {
            const data = await this.infoController.getCities();
            this._sendSuccess(res, 'Success', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async getNews(req, res, next) {
        this.logger.info('getNews');
        try {
            const data = await this.infoController.getNews();
            this._sendSuccess(res, 'Success', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async getEvents(req, res, next) {
        this.logger.info('getEvents');
        try {
            const data = await this.infoController.getEvents();
            this._sendSuccess(res, 'Success', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async getBloodGroups(req, res, next) {
        this.logger.info('getBloodGroups');
        try {
            const data = await this.infoController.getBloodGroups();
            this._sendSuccess(res, 'Success', utils.extract(data, 'groupType'));
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async addRole(req, res, next) {
        this.logger.info('addRole');
        try {
            const token = utils.extractToken(req);
            const { data, message } = await this.userController
                .addNewRole({ ...req.body, rawToken: token });
            this._sendSuccess(res, message, data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async unauthorized(req, res, next) {
        this._sendUnauthorized(res, 'Niste autorizovani za pristup!', null);
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
