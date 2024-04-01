"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::directory.directory",
  ({ strapi }) => ({
    async fetchAllDirectories(ctx) {
      const userId = ctx.state.user.id; // Extract the user ID from the context

      const recursiveFetch = async (parentId = null) => {
        const entities = await strapi.entityService.findMany(
          "api::directory.directory",
          {
            filters: { parent: parentId },
            populate: { children: true, users_permissions_users: true },
          }
        );

        const filteredEntities = entities.filter(
          (entity) =>
            // Check if the directory is accessible by the current user
            entity.users_permissions_users.find((user) => user.id === userId) ||
            entity.users_permissions_users.length === 0 // Optionally include directories with no specific user permissions set
        );

        for (let entity of filteredEntities) {
          if (entity.children) {
            entity.children = await recursiveFetch(entity.id);
          }
        }
        return filteredEntities;
      };

      const directories = await recursiveFetch();
      return ctx.send(directories); // Send the response back
    },
  })
);
