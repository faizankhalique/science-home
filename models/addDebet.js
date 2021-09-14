const mongoose = require("mongoose");
const addDebetSchema = new mongoose.Schema({
  vendorName: {
    type: String
  },
  vendorId: {
    type: Number
  },
  debet: {
    type: Number,
    min: 0
  },
  credit: {
    type: Number,
    min: 0
  },
  created_at: {
    type: Date
  },
  update_at: {
    type: Date
  }
});
const AddDebet = mongoose.model("AddDebet", addDebetSchema);
module.exports.AddDebet = AddDebet;
