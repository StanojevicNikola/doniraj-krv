const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates BloodGroup service operations
 */
class BloodGroupService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const bloodGroup = utils.clone(data);
        if (id != null) {
            bloodGroup._id = id;
        }

        const result = await models.BloodGroup.create(bloodGroup);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.BloodGroup.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.BloodGroup.findById(id).populate(fields).lean().exec();
    }

    async findCompatible(bloodGroup) {
        // TODO: check how to determine compatible group
        const compatibleMap = this.config.bloodGroups.compatibleBloodGroups;
        const type = await models.BloodGroup
            .findById(bloodGroup)
            .select({ _id: 0, groupType: 1 });

        return compatibleMap[`${type.groupType}`];
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.BloodGroup.deleteOne({ _id: id });
    }
}

module.exports = BloodGroupService;
