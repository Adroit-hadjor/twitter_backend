'use strict';
const {sanitizeEntity} = require("strapi-utils")
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        console.log(ctx)
        const user = ctx.state.user 
        if (!user){
            const message = "Not logged in"
            return message
        }
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.profile.create(data, { files });
        } else {
          ctx.request.body.user_id = user.id
          entity = await strapi.services.profile.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.profile });
      },


      async delete(ctx) {
        const { id } = ctx.params;
        const user = ctx.state.user 
        if (!user){
            const message = "Not logged in"
            return message
        }
        const user_profile  = await strapi.services.profile.findOne({ id });
        if (user_profile.user_id !== user.id){
            //return "This is not your post"
            ctx.send({
                message: 'This is not your post!'
            }, 400);
            return
        }
        const entity = await strapi.services.profile.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.profile });
      },
};
