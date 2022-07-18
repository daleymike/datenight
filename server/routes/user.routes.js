const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  // register user
  app.post("/api/users/register", UserController.register);
  // login user
  app.post("/api/users/login", UserController.login);
  // logout user
  app.post("/api/users/logout", UserController.logout);
  // find one user
  app.get("/api/user/:email", UserController.getOneUser);
  // get user by id
  app.get("/api/user/id/:user_id", UserController.getOneUserWithId);
};
