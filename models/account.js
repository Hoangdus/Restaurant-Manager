const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Accounts = new Scheme(
  {
    username: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 },
    role: { type: Number }, //
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", Accounts);