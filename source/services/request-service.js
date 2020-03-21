const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Request service operations
 */
class RequestService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const request = utils.clone(data);
        if (id != null) {
            request._id = id;
        }

        const result = await models.Request.create(request);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Request.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Request.findById(id).populate(fields).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Request.deleteOne({ _id: id });
    }
}

module.exports = RequestService;
