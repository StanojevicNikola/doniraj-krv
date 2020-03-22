class InfoService
{
	constructor
	(
		logger, config
	)
	{
		this.logger = logger;
		this.config = config;
	}

	async create(data, id = null) 
	{
		this.logger.debug(`create(data=${data})`);
		if (data == null) 
		{
				throw new Error('No info data');
		}

		const info = utils.clone(data);
	
		if (id != null) 
		{
				donor._id = id;
		}

		const result = await models.Info.create(info);
		return result._id;
	}

	async find(query, fields = null) 
	{
		this.logger.debug(`find ${query}`);
		
		return models.Info.find(query)
				.populate(fields)
				.lean()
				.exec();
	}

}

module.exports = InfoService;