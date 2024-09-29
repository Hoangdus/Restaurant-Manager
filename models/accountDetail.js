const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const AccountDetail = new Scheme(
  {
    full_name: { type: String, maxLength: 255 },
    phone_number: { type: String, maxLength: 255 },
    address: { type: String, maxLength: 255 },
    picture_url: { type: String },
    id_account: { type: Scheme.Types.ObjectId, ref: "account" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account_detail", AccountDetail);