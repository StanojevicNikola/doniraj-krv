const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

class MongoDB {
    constructor({ config, logger }) {
        this.config = config;
        this.logger = logger;
    }

    async connect() {
        const { url, database } = this.config.storage.mongodb;
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => this.logger.info(`Connected to ${url} ${database}`))
            .catch((err) => this.logger.error('Connection error', err));
    }

    async disconnect() {
        await mongoose.disconnect();
        this.logger.info('Disconnected database');
    }

    async drop() {
        await mongoose.connection.db.dropDatabase();
        this.logger.info('Database dropped');
    }
}

module.exports = MongoDB;
