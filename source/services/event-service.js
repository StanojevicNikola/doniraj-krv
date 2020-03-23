const models = require('../models');
const utils = require('../utils');

class EventService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No events');
        }

        const event = utils.clone(data);

        if (id != null) {
            event._id = id;
        }

        const result = await models.Event.create(event);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);

        return models.Event.find(query)
            .populate(fields)
            .lean()
            .exec();
    }
}

module.exports = EventService;
