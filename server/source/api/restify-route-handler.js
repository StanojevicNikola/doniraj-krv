const jwt = require('jsonwebtoken');
const utils = require('../utils');

class RestifyRouteHandler {
    constructor({
        logger,
        config,
        adminController,
        placeController,
        requestController,
        userController,
        infoController,
    }) {
        this.logger = logger;
        this.config = config;
        this.placeController = placeController;
        this.requestController = requestController;
        this.userController = userController;
        this.infoController = infoController;
        this.adminController = adminController;
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
            const { data, message } = await this.userController
                .registerUser(email, password, username, name);
            this._sendSuccess(res, message, data);
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

    async getPlaces(req, res, next) {
        this.logger.info('getPlaces');
        try {
            const data = await this.infoController.getPlaces();
            this._sendSuccess(res, 'Success', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
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
        try {
            const rawToken = utils.extractToken(req);
            const tokenData = utils.decodeToken(rawToken);
            const {
                radius, city, queryType, groups, places,
            } = req.body;
            const { recipient } = tokenData;
            const { data, message } = await this.requestController
                .publishRequest(radius, city, recipient, queryType, groups, places);
            this._sendSuccess(res, message, data);
        } catch (e) {
            this._sendBadRequest(res, e.message, null);
        }
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

    async createNews(req, res, next) {
        this.logger.info('createNews');
        try {
            this.logger.info(req.body);
            const data = await this.adminController.createNews(req.body);
            this._sendSuccess(res, 'Uspesno ste kreirali vest', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async updateNews(req, res, next) {
        this.logger.info('updateNews');
        const { id, query } = req.body;
        try {
            const data = await this.adminController.updateNews(id, query);
            this._sendSuccess(res, 'Uspesno ste azurirali vest', data);
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

    async createPlace(req, res, next) {
        this.logger.info('createPlace');
        try {
            const data = await this.adminController.createPlace(req.body);
            this._sendSuccess(res, 'Uspesno ste kreirali novo mesto', data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async updatePlace(req, res, next) {
        this.logger.info('updatePlace');
        const { id, query } = req.body;
        try {
            const data = await this.adminController.updatePlace(id, query);
            this._sendSuccess(res, 'Uspesno ste azurirali mesto', data);
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
            this._sendSuccess(res, 'Success', data);
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

    async getUserData(req, res, next) {
        this.logger.info('getUserData');
        try {
            const token = utils.extractToken(req);
            const { data, message } = await this.userController
                .getUser({ rawToken: token });
            this._sendSuccess(res, message, data);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }
        next();
    }

    async createEvent(req, res, next) {
        this.logger.info('create Event');
        try {
            const result = await this.adminController.createEvent(req.body);
            this._sendSuccess(res, 'Uspesno ste kreirali dogadjaj', result);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }

        next();
    }

    async updateEvent(req, res, next) {
        this.logger.info('update event');
        const { id, query } = req.body;
        try {
            const result = await this.adminController.updateEvent(id, query);
            this._sendSuccess(res, 'Uspesno ste azurirali dogadjaj', result);
        } catch (e) {
            this.logger.error(e.message);
            this._sendBadRequest(res, e.message, null);
        }

        next();
    }

    async createTransaction(req, res, next) {
        this.logger.info('Create transaction');
        try {
            const { data, message } = await this.adminController.createTransaction(req.body);
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
        this._sendResponse(res, 200, { message, data });
    }
}

module.exports = RestifyRouteHandler;
