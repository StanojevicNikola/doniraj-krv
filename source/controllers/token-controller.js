class TokenController {
    constructor(
        {
            logger, config, tokenService,
        },
    ) {
        this.logger = logger;
        this.config = config;
        this.tokenService = tokenService;
    }

    async findOne(query) {
        return this.tokenService.findOne(query);
    }

    async accessControl(routePrefix, rawToken) {
        const token = await this.tokenService.findOne({ rawToken });
        return token.data.accessibleRoutes.includes(routePrefix) && token.data.isActive;
    }
}

module.exports = TokenController;
