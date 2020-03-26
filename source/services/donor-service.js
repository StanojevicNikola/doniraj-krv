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
        return models.Donor.findById(id).populate(fields).lean().exec();
    }

    async findEligibleDonors(locations, groups = this.config.bloodGroups.all) {
        const { minDaysSinceDonation } = this.config.donor;
        const dateConstraint = new Date();
        dateConstraint.setDate(dateConstraint.getDate() - minDaysSinceDonation);
        let donorIdS = await models.Donor
            .find({ geolocation: { $in: locations }, lastDonation: { $gt: dateConstraint } })
            .select({ _id: 1 })
            .lean()
            .exec();
        donorIdS = donorIdS.map((id) => id._id);
        return models.Donor.find().where('_id').in(donorIdS)
            .populate({
                path: 'blood',
                match: { groupType: { $in: groups } },
                select: { groupType: 1, _id: 0 },
            })
            .populate('user', 'email')
            .exec();
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.Donor.deleteOne({ _id: id });
    }
}

module.exports = DonorService;
