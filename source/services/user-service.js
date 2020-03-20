const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates User service operations
 */
class UserService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No user data');
        }

        const user = utils.clone(data);
        if (id != null) {
            user._id = id;
        }

        const result = await models.User.create(user);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.User.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.User.findById(id).populate(fields).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.User.deleteOne({ _id: id });
    }
}

module.exports = UserService;
