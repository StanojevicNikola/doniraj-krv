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

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Event.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Event.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Event.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.Event.updateOne(id, update)
            .lean()
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Event.deleteOne({ _id: id });
    }
}

module.exports = EventService;
