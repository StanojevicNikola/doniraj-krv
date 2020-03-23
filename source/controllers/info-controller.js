class InfoController 
{
	constructor
	(
		{ logger, config, bloodGroupService, newsService, geolocationService }
	)
	{
		this.logger = logger;
		this.config = config;
		this.bloodGroupService = bloodGroupService;
		this.newsService = newsService;
		this.geolocationService = geolocationService;
	}

	async getNews()
	{
		return this.newsService.find({});
	}

	async getBloodGroups()
	{
		return this.bloodGroupService.find({});
	}

	async getCities() 
	{
			return this.geolocationService.find({});
	}

}

module.exports = InfoController;