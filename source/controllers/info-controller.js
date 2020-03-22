const utils = require('../utils');

class InfoController
{
	constructor
	(
		logger, config, infoService, bloodGroupService
	)
	{
		this.logger = logger;
		this.config = config;
		this.infoService = infoService;
		this.bloodGroupService = bloodGroupService;
	}

	async getInfo()
	{
		return this.infoService.find({});
	}

	async getBloodGroups()
	{
		return this.bloodGroupService.find({});
	}

}

module.exports = InfoController;