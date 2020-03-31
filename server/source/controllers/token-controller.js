const utils = require('../utils');

class TokenController {
    constructor(
        {
            logger, config, tokenService, userService,
        },
    ) {
        this.logger = logger;
        this.config = config;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    async findOne(query) {
        return this.tokenService.findOne(query);
    }

    async accessControl(routePrefix, rawToken) {
        const token = utils.decodeToken(rawToken);
        if (routePrefix === 'app') return true;
        return token.accessibleRoutes.includes(routePrefix) && token.isActive;
    }
}

module.exports = TokenController;
