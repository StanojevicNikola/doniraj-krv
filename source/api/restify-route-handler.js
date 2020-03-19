class RestifyRouteHandler {
    constructor({ logger }) {
        this.logger = logger;
    }


    async hello(req, res, next) {
        this.logger.info('Hello');
        this.sendSuccess(res, 'Success', { data: 'caocao' });
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
