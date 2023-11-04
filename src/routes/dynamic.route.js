const router = require("express").Router();
const { asyncHandler } = require("../middlewares/asyncHandler");
const dynamicController = require("../controllers/dynamic.controller");

router.route("/:table").post(asyncHandler(dynamicController.crud));
module.exports = router;
