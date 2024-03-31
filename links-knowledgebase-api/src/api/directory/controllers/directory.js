'use strict';

/**
 * directory controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::directory.directory', ({ strapi }) => ({
  async fetchAllDirectories(ctx) {
    const recursiveFetch = async (parentId = null) => {
      const entities = await strapi.entityService.findMany('api::directory.directory', {
        filters: { parent: parentId },
        populate: { children: true }, // Ensure to populate children to fetch them recursively
      });
      for (let entity of entities) {
        if (entity.children) {
          entity.children = await recursiveFetch(entity.id);
        }
      }
      return entities;
    };

    const directories = await recursiveFetch();
    return ctx.send(directories); // Send the response back
  },
}));
