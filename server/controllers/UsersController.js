const EStoreauthModel = require("../Model/authModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EStoreauthModel.findOne({ email });

    if (!user) {
      return res.send({
        error: "INVALID EMAIL",
        msg: "Email does not exists.",
      });
    }

    if (password !== user.password) {
      return res.send({
        error: "INVALID PASSWORD",
        msg: "Incorrect password.",
      });
    }

    // ✅ JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
      role: user.role,
    };

    // ✅ Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // ✅ Send response with token

    return res.status(200).json({
      message: "Sign-in successful",
      jwtToken: token, // your requested key name
      user: payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const addUser = async (req, res) => {
 
};

const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await EStoreauthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if OTP matches and is not expired
    const now = new Date();

    if (user.otp == otp) {
      if (user.otpExpiresAt) {
        if (user.otpExpiresAt > now) {
          user.isVerified = true;
          user.otp = null; // Clear OTP after verification
          user.otpExpiresAt = null;
          res.status(200).json({ message: "Otp has been verfied", user });
          await user.save();
        } else {
          return res.status(400).json({
            error: "OTP HAS BEEN EXPIRED",
          });
        }
      } else {
        return res
          .status(400)
          .json({ error: "User otpExpiresAt condtion get flase", user });
      }
    } else {
      return res.json({
        error: "OTP DOES NOT MATCH",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const SearchAdmin = async (req, res) => {
  const query = req.query;
  console.log("Name: ", req.query.name);
  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }

  console.log("Query received:", query); // Should log

  // Example logic:
  const admins = await EStoreauthModel.find({
    firstName: { $regex: query.name, $options: "i" },
  }).select("firstName lastName email _id");
  if (admins) {
    res.status(200).json({ message: admins });
  } else {
    res.status(200).json({ message: `Search for: ${query.name} Not Found` });
  }
};

// const RemoveAdmin = async(req,res)=>{
//   const id = req.params.id,
// }

module.exports = { addUser, verifyUser, SignIn, SearchAdmin };
