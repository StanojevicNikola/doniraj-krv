const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates Donor service operations
 */
class DonorService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const donor = utils.clone(data);
        if (id != null) {
            donor._id = id;
        }

        const result = await models.Donor.create(donor);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Donor.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.Donor.findById(id)
            .populate(fields)
            .lean()
            .exec();
    }

    async findOne(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.Donor.findOne(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async updateOne(id, update) {
        this.logger.debug(`updateOne ${id}`);
        return models.User.findOneAndUpdate(
            { _id: id }, update, { useFindAndModify: false },
        )
            .lean()
            .exec();
    }

    async findEligibleDonors(locations, groups = this.config.bloodGroups.all) {
        const { minDaysSinceDonation } = this.config.donor;
        const dateConstraint = new Date();
        dateConstraint.setDate(dateConstraint.getDate() - minDaysSinceDonation);
        const donors = await models.Donor
            .find({
                geolocation: { $in: locations },
                lastDonation: { $lt: dateConstraint },
            })
            .populate({
                path: 'user',
                match: { isActive: true },
            })
            .populate({
                path: 'blood',
                match: { groupType: { $in: groups } },
                select: { groupType: 1, _id: 0 },
            })
            .populate('user', ['email', 'name'])
            .select()
            .lean()
            .exec();
        return donors.filter((donor) => donor.blood != null);
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Donor.deleteOne({ _id: id });
    }
}

module.exports = DonorService;
