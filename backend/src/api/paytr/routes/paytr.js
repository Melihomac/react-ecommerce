module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/paytr',
      handler: 'paytr.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/paytr',
      handler: 'paytr.callbackAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};