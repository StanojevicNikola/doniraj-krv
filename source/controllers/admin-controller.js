class AdminController {
    constructor({
        logger, config, placeService, newsService, eventService, geolocationService,
    }) {
        this.logger = logger;
        this.config = config;
        this.newsService = newsService;
        this.eventService = eventService;
        this.placeService = placeService;
        this.geolocationService = geolocationService;
    }

    async createNews(body) {
        const data = {
            title: body.title,
            description: body.description,
            date: body.date,
        };
        return this.newsService.create(data);
    }

    async updateNews(_title, body) {
        const id = { title: _title };
        const data = { title: body.title, description: body.description, date: body.date };

        return this.newsService.updateOne(id, data);
    }

    async createEvent(body) {
        const geo_ref = {
            city: body.city,
            lat: body.lat,
            lng: body.lng,
        };
        const geo_id = await this.geolocationService.create(geo_ref);

        const data = {
            title: body.title,
            description: body.description,
            date: body.date,
            hour: body.hour,
            geolocation: geo_id,
        };

        return this.eventService.create(data);
    }

    async updateEvent(_title, body) {
        let geo_id = await this.geolocationService.findOne({ city: body.city });
        const geo_data = {
            city: body.city,
            lat: body.lat,
            lng: body.lng,
        };

        if (geo_id === null) geo_id = await this.geolocationService.create(geo_data);

        const id = { title: _title };
        const data = {
            title: body.title,
            description: body.description,
            date: body.date,
            hour: body.hour,
            geolocation: geo_id,
        };

        return this.eventService.updateOne(id, data);
    }

    async createPlace(body) {
        const geo_ref = {
            city: body.city,
            lat: body.lat,
            lng: body.lng,
        };
        const geo_id = await this.geolocationService.create(geo_ref);

        const data = {
            address: body.address,
            name: body.name,
            description: body.description,
            workingHours: body.workingHours,
            date: body.date,
            isStatic: body.isStatic,
            geolocation: geo_id,
        };

        return this.placeService.create(data);
    }

    async updatePlace(_name, body) {
        let geo_id = await this.geolocationService.findOne({ city: body.city });
        const geo_data = {
            city: body.city,
            lat: body.lat,
            lng: body.lng,
        };

        if (geo_id === null) geo_id = await this.geolocationService.create(geo_data);

        const id = { name: _name };
        const data = {
            address: body.address,
            name: body.name,
            description: body.description,
            workingHours: body.workingHours,
            date: body.date,
            isStatic: body.isStatic,
            geolocation: geo_id,
        };

        return this.placeService.updateOne(id, data);
    }
}

module.exports = AdminController;
