const utils = require('../utils');

class RestifyRouteHandler {
    constructor({
        logger, placeController, requestController, geolocationService, bloodGroupService,
    }) {
        this.logger = logger;
        this.placeController = placeController;
        this.requestController = requestController;
        this.geolocationService = geolocationService;
        this.bloodGroupService = bloodGroupService;
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
        const data = await this.geolocationService.find({});
        this._sendSuccess(res, 'Success', data);
        next();
    }

    async getBloodGroups(req, res, next) {
        this.logger.info('getBloodGroups');
        const data = await this.bloodGroupService.find({});
        this._sendSuccess(res, 'Success', utils.extract(data, 'groupType'));
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
