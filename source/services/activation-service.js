const models = require('../models');
const utils = require('../utils');

class ActivationService {
    constructor({
        logger, config,
    }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No news');
        }

        const activation = utils.clone(data);

        if (id != null) {
            activation._id = id;
        }

        const result = await models.Activation.create(activation);
        return result._id;
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${JSON.stringify(query)}`);

        return models.Activation.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }
}

module.exports = ActivationService;
