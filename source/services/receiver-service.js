const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Request service operations
 */
class ReceiverService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const recever = utils.clone(data);
        if (id != null) {
            recever._id = id;
        }

        const result = await models.Receiver.create(recever);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Receiver.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Receiver.findById(id).populate(fields).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Receiver.deleteOne({ _id: id });
    }
}

module.exports = ReceiverService;
