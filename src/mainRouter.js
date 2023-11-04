const express = require("express");
const authRoute = require("./routes/auth.route");
const dynamicRoute = require("./routes/dynamic.route");
const { mainRoutes } = require("./utils/constant");

const mainRouter = express.Router();

mainRouter.use(mainRoutes.auth, authRoute);
mainRouter.use(mainRoutes.crud, dynamicRoute);

module.exports = mainRouter;
