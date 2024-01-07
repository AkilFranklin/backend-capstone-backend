const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.use("/:movie_id/theaters", theatersRouter).all(methodNotAllowed);
router.use("/:movie_id/reviews", reviewsRouter).all(methodNotAllowed);
router.route("/:movie_id").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
