const awilix = require('awilix');

const MongoDB = require('./storage/mongodb/mongodb');
const Logger = require('./logger/winston/winston-logger');
const RestifyServer = require('./api/restify-server');
const RestifyRouteHandler = require('./api/restify-route-handler');

class App {
    constructor(config) {
        this.config = config;
        this.bootstrap(this.config);
    }

    bootstrap(config) {
        this.container = awilix.createContainer({
            injectionMode: awilix.InjectionMode.PROXY,
        });

        this.container.loadModules(
            ['./source/services/*.js', './source/controllers/*.js'], {
                formatName: 'camelCase',
                resolverOptions: {
                    lifetime: awilix.Lifetime.SINGLETON,
                    register: awilix.asClass,
                },
            },
        );

        this.container.register({
            config: awilix.asValue(config),
            logger: awilix.asClass(Logger).singleton(),
            api: awilix.asClass(RestifyServer).singleton(),
            apiRouteHandler: awilix.asClass(RestifyRouteHandler).singleton(),
            storage: awilix.asClass(MongoDB).singleton(),
        });
    }

    static async connect(storage) {
        await storage.connect();
    }

    async start() {
        this.container.resolve('storage').connect();
        this.container.resolve('api').start();
    }

    async stop() {
        this.container.resolve('api').stop();
        this.container.resolve('storage').disconnect();
    }
}

module.exports = App;
