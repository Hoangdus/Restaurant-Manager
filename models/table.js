const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Tables = new Scheme(
  {
    table_name: { type: String, maxlength: 255 },
    table_status: { type: Number, default: 0 }, // 0: con` trong, 1: ban da su dung
    oder_name: {type: String},
    id_account: { type: Scheme.Types.ObjectId, ref: "account" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("table", Tables);
