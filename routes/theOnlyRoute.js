const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  createPrediction,
  getPrediction,
} = require("../handlers/theOnlyHandler");

router.route("/").get(getPrediction).post(createPrediction);

module.exports = router;
