const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema(
  {
    search: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Input = mongoose.model("Input", InputSchema);

module.exports = Input;
