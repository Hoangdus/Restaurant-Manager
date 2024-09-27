const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Tables = new Scheme(
  {
    table_name: { type: String, maxlength: 255 },
    table_status: { type: Number }, // 0: con` trong, 1: ban da su dung, 2: het ban
    id_account: { type: Scheme.Types.ObjectId, ref: "account" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("table", Tables);
