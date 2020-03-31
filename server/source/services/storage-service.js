const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Storage service operations
 */
class StorageService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const storage = utils.clone(data);
        if (id != null) {
            storage._id = id;
        }

        const result = await models.Storage.create(storage);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Storage.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Storage.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Storage.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async updateBlood(place, blood, amount) {
        this.logger.debug(`update blood ${amount}`);
        return models.Storage.updateOne({ place, blood }, { $inc: { amount } })
            .lean()
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Storage.deleteOne({ _id: id });
    }
}

module.exports = StorageService;
