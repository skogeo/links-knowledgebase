module.exports = {
  routes: [
    {
      method: "GET",
      path: "/directories/all",
      handler: "directory.fetchAllDirectories",
    },
  ],
};
