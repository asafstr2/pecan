const mongoose = require("mongoose");

//user schema consist of email userName profile image and encripted password with a method comparePassword that returns a boolian
const PredictionSchema = new mongoose.Schema(
  {
    RequestId: {
      type: String,
    },
    CustomerId: {
      type: String,
    },
    ModelId: {
      type: String,
    },
    PredictionInputs: [
      {
        type: Number,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prediction", PredictionSchema);

// all will need to be ObjectId type but this is just an example and user is not requried so a bit of a shortcut
// RequestId: {
// 	type: mongoose.Types.ObjectId,
// 	ref: 'User'
// },
