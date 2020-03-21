class RestifyRouteHandler {
    constructor({ logger, placeController, requestController }) {
        this.logger = logger;
        this.placeController = placeController;
        this.requestController = requestController;
    }


    async hello(req, res, next) {
        this.logger.info('Hello');
        this.sendSuccess(res, 'Success', { data: 'caocao' });
        next();
    }

    async findPlaces(req, res, next) {
        this.logger.info('findPlaces');
        const data = await this.placeController.find(req);
        if (data.length > 0) this.sendSuccess(res, 'Success', data);
        else {
            this.sendSuccess(res, 'Nema lokacija u trazenoj okolini!', {});
        }
        next();
    }

    async requestBlood(req, res, next) {
        this.logger.info('blood request triggered');
        const donors = await this.requestController.publishRequest(req.body);
        this.sendSuccess(res, 'Mailovi su poslati na adrese', { donors });
        next();
    }

    sendResponse(res, status, responseData) {
        res.status(status);
        res.send({
            ...responseData,
            status,
            timestamp: (new Date()).toISOString(),
        });
    }

    sendSuccess(res, message, data) {
        this.sendResponse(res, 200, { message, data });
    }

    sendBadRequest(res, message, data) {
        this.sendResponse(res, 400, { message, data });
    }

    sendUnauthorized(res, message, data) {
        this.sendResponse(res, 401, { message, data });
    }
}

module.exports = RestifyRouteHandler;
