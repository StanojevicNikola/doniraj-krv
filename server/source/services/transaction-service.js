const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Transaction service operations
 */
class TransactionService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const transaction = utils.clone(data);
        if (id != null) {
            transaction._id = id;
        }

        const result = await models.Transaction.create(transaction);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Transaction.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Transaction.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Transaction.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.Transaction.updateOne(id, update)
            .lean()
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Transaction.deleteOne({ _id: id });
    }
}

module.exports = TransactionService;
