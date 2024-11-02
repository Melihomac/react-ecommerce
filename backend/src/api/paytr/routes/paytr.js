module.exports = {
  routes: [
    {
      method: "GET",
      path: "/paytr",
      handler: "paytr.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/paytr/callback",
      handler: "paytr.callbackAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
