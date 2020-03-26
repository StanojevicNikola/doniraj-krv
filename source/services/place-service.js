const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates StaticPlace service operations
 */
class PlaceService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const place = utils.clone(data);
        if (id != null) {
            place._id = id;
        }

        const result = await models.Place.create(place);
        return result._id;
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Place.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Place.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Place.findById(id).populate(fields).lean().exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Place.deleteOne({ _id: id });
    }
}

module.exports = PlaceService;
