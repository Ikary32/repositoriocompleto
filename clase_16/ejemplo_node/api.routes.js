const express = require('express');
const router = express.Router();

const userRouter = require("./src/routes/user.routes");
router.use("/users", userRouter);

const movieRouter = require("./src/routes/movie.routes");
router.use("/movies", movieRouter);

module.exports = router;