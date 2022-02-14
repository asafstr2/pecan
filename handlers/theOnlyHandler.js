const db = require("../models");
const queue1 = require("../queues/queue1");

exports.getPrediction = async (req, res, next) => {
  try {
    const data = await db.Prediction.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.createPrediction = async (req, res, next) => {
  try {
    if (req.body.ModelId === "error") {
      return next({
        status: 400,
        message: "server error",
      });
    }
    queue1({ ...req.body });
    // const data = await db.Prediction.create({ ...req.body });
    res.status(201).json("ok");
  } catch (error) {
    next(error);
  }
};
