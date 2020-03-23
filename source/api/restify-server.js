const restify = require('restify');

class RestifyServer {
    constructor({ config, logger, apiRouteHandler }) {
        this.config = config;
        this.logger = logger;
        this.routeHandlers = apiRouteHandler;
        this.init();
    }

    init() {
        this.server = restify.createServer({
            name: `${this.config.app} API Server`,
            version: this.config.version,
        });
        this.server.use(restify.plugins.bodyParser());
        this.registerRoutes();
    }

    registerRoutes() {
        this.server.get('/hello', this.routeHandlers.hello.bind(this.routeHandlers));
        this.server.post('/findPlaces', this.routeHandlers.findPlaces.bind(this.routeHandlers));
        this.server.post('/requestBlood', this.routeHandlers.requestBlood.bind(this.routeHandlers));
        this.server.post('/createUser', this.routeHandlers.createUser.bind(this.routeHandlers));
        this.server.get('/getCities', this.routeHandlers.getCities.bind(this.routeHandlers));
        this.server.get('/getBloodGroups', this.routeHandlers.getBloodGroups.bind(this.routeHandlers));
        this.server.get('/getNews', this.routeHandlers.getNews.bind(this.routeHandlers));
        this.server.get('/getEvents', this.routeHandlers.getEvents.bind(this.routeHandlers));
    }

    start() {
        const { logger, server } = this;
        this.server.listen(this.config.APIserver.port, () => {
            logger.info(`${server.name} listening at ${server.url}`);
        });
    }

    stop() {
        this.server.stop();
    }
}

module.exports = RestifyServer;
