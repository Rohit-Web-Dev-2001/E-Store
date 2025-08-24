const { default: mongoose } = require("mongoose");
const EStoreauthSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"], // optional: restrict roles to specific values
  },

  password: {
    type: String,
    required: true,
  },
});

const EStoreauthModel = mongoose.model("EStoreauth", EStoreauthSchema);
module.exports = EStoreauthModel;
