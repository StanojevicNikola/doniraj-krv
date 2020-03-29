const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Request service operations
 */
class RecipientService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const recipient = utils.clone(data);
        if (id != null) {
            recipient._id = id;
        }

        const result = await models.Recipient.create(recipient);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Recipient.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Recipient.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Recipient.findById(id).populate(fields).lean().exec();
    }

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.Recipient.updateOne(id, update)
            .lean()
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Recipient.deleteOne({ _id: id });
    }
}

module.exports = RecipientService;
