'use strict';
const {sanitizeEntity} = require("strapi-utils")
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        const user = ctx.state.user
        if (!user){
            const message = "Not logged in"
            return message
        }
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.tweets.create(data, { files });
        } else {
          ctx.request.body.users_id = user.id
          entity = await strapi.services.tweets.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.tweets });
      },
};
