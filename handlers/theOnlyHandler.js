const db = require("../models");
const queue1 = require("../queues/queue1");
const { clearHash } = require("../services/cache");
exports.getPrediction = async (req, res, next) => {
  try {
    const data = await db.Prediction.find().cache({ key: "predection" });
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
    const data = await db.Prediction.findOne({
      RequestId: req.body.RequestId,
    }).cache({
      key: "predection",
    });
    if (data) {
      return res.status(200).json(data);
    }

    queue1({ ...req.body });
    clearHash("predection");
    res.status(201).json("ok prediction began");
  } catch (error) {
    next(error);
  }
};
