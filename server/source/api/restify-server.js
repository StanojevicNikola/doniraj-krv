const restify = require('restify');
const rjwt = require('restify-jwt-community');
const utils = require('../utils');

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
                const rawToken = utils.extractToken(req);
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
            path: [/\/users*/, /\/app*/],
        }));
        this._registerRoutes();
    }


    _registerRoutes() {
        this.server.post('/donor/findPlaces', this.routeHandlers.findPlaces.bind(this.routeHandlers));
        this.server.post('/recipient/requestBlood', this.routeHandlers.requestBlood.bind(this.routeHandlers));

        this.server.post('/app/createUser', this.routeHandlers.addRole.bind(this.routeHandlers));
        this.server.get('/app/getCities', this.routeHandlers.getCities.bind(this.routeHandlers));
        this.server.get('/app/getBloodGroups', this.routeHandlers.getBloodGroups.bind(this.routeHandlers));
        this.server.get('/app/getNews', this.routeHandlers.getNews.bind(this.routeHandlers));
        this.server.get('/app/getEvents', this.routeHandlers.getEvents.bind(this.routeHandlers));

        this.server.post('/users/register', this.routeHandlers.registerUser.bind(this.routeHandlers));
        this.server.get('/users/activate/:activationId', this.routeHandlers.activateUser.bind(this.routeHandlers));
        this.server.post('/users/login', this.routeHandlers.logIn.bind(this.routeHandlers));
        this.server.post('/user/addRole', this.routeHandlers.addRole.bind(this.routeHandlers));
        this.server.post('/user/data', this.routeHandlers.getUserData.bind(this.routeHandlers));

        this.server.get('/unauthorized', this.routeHandlers.unauthorized.bind(this.routeHandlers));
        this.server.get('/test/hello', this.routeHandlers.hello.bind(this.routeHandlers));

        this.server.post('/admin/createNews', this.routeHandlers.createNews.bind(this.routeHandlers));
        this.server.post('/admin/updateNews', this.routeHandlers.updateNews.bind(this.routeHandlers));
        this.server.post('/admin/createEvent', this.routeHandlers.createEvent.bind(this.routeHandlers));
        this.server.post('/admin/updateEvent', this.routeHandlers.updateEvent.bind(this.routeHandlers));
        this.server.post('/admin/createPlace', this.routeHandlers.createPlace.bind(this.routeHandlers));
        this.server.post('/admin/updatePlace', this.routeHandlers.updatePlace.bind(this.routeHandlers));
        this.server.post('/admin/createTransaction', this.routeHandlers.createTransaction.bind(this.routeHandlers));
    }

    start() {
        const { logger, server } = this;
        this.server.listen(this.config.APIserver.port, () => {
            logger.info(`${server.name} listening at ${server.url}`);
        });
    }

    stop() {
        this.server.close();
    }
}

module.exports = RestifyServer;
