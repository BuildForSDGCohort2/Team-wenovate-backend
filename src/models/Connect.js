const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  connect_type: {
    type: String,
    enum: ["sales", "fund"],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const Connect = mongoose.model("Connect", connectSchema);
module.exports = Connect;
