const restify = require('restify');
const rjwt = require('restify-jwt-community');

class RestifyServer {
    constructor({
        config, logger, apiRouteHandler, tokenController,
    }) {
        this.config = config;
        this.logger = logger;
        this.routeHandlers = apiRouteHandler;
        this.tokenController = tokenController;
        this.init();
    }

    init() {
        this.server = restify.createServer({
            name: `${this.config.app} API Server`,
            version: this.config.version,
        });
        const accessControl = async (req, res, next) => {
            if (Object.prototype.hasOwnProperty.call(req.headers, 'authorization')) {
                const rawToken = req.headers.authorization.replace('Bearer ', '');
                const routePrefix = req.url.substr(1, req.url.indexOf('/', 1) - 1);
                const result = await this.tokenController.accessControl(routePrefix, rawToken);
                if (!result) {
                    req.url = '/unauthorized';
                }
            }
            next();
        };
        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());
        this.server.pre(accessControl);

        this.server.use(rjwt({
            secret: this.config.jwt.secret,
        }).unless({
            path: [/\/users*/],
        }));
        this._registerRoutes();
    }


    _registerRoutes() {
        this.server.post('/users/login', this.routeHandlers.logIn.bind(this.routeHandlers));
        this.server.get('/test/hello', this.routeHandlers.hello.bind(this.routeHandlers));
        this.server.post('/donor/findPlaces', this.routeHandlers.findPlaces.bind(this.routeHandlers));
        this.server.post('/recipient/requestBlood', this.routeHandlers.requestBlood.bind(this.routeHandlers));
        this.server.post('/app/createUser', this.routeHandlers.addRole.bind(this.routeHandlers));
        this.server.get('/app/getCities', this.routeHandlers.getCities.bind(this.routeHandlers));
        this.server.get('/app/getBloodGroups', this.routeHandlers.getBloodGroups.bind(this.routeHandlers));
        this.server.get('/app/getNews', this.routeHandlers.getNews.bind(this.routeHandlers));
        this.server.get('/app/getEvents', this.routeHandlers.getEvents.bind(this.routeHandlers));
        this.server.post('/users/register', this.routeHandlers.registerUser.bind(this.routeHandlers));
        this.server.get('/users/activate/:activationId', this.routeHandlers.activateUser.bind(this.routeHandlers));
        this.server.get('/unauthorized', this.routeHandlers.unauthorized.bind(this.routeHandlers));
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
