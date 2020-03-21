const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Request service operations
 */
class GeolocationService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const geolocation = utils.clone(data);
        if (id != null) {
            geolocation._id = id;
        }

        const result = await models.Geolocation.create(geolocation);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Geolocation.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Geolocation.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Geolocation.findById(id).populate(fields).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Geolocation.deleteOne({ _id: id });
    }
}

module.exports = GeolocationService;
