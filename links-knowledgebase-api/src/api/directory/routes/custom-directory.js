module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/directories/all',
      handler: 'directory.fetchAllDirectories',
      config: {
        auth: false,
      },
    },
  ],
};
