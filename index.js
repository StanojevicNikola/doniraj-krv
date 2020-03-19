const fs = require('fs');

const App = require('./source/app');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const app = new App(config);

const logger = app.container.resolve('logger');
const storage = app.container.resolve('storage');

App.connect(storage)
    .then(() => app.start()
        .then(() => logger.debug('Server started')));
