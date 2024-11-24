const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async register(ctx) {
    const { username, email, password, user_phone } = ctx.request.body;

    if (!username || !email || !password || !user_phone) {
      return ctx.badRequest(
        "Please provide username, email, password, and user_phone."
      );
    }

    // Check if user already exists
    const existingUser = await strapi
      .query("user", "users-permissions")
      .findOne({ email });
    if (existingUser) {
      return ctx.badRequest("Email is already taken.");
    }

    try {
      // Register the new user with the additional `user_phone` field
      const newUser = await strapi.plugins[
        "users-permissions"
      ].services.user.add({
        username,
        email,
        password,
        user_phone,
      });

      // Generate JWT and return sanitized user data
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: newUser.id,
      });
      ctx.send({
        jwt,
        user: sanitizeEntity(newUser, {
          model: strapi.query("user", "users-permissions").model,
        }),
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return ctx.badRequest("Registration failed due to an error.");
    }
  },
};
