const EStoreauthModel = require("../Model/authModel");
const nodemailer = require("nodemailer");

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

    // Basic validation

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      // Check for existing user
      const existingUser = await EStoreauthModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        // Create new user
        const newUser = new EStoreauthModel({
          firstName,
          lastName,
          email,
          password, // In production, hash this before saving
          role: role || "user", // defaults to 'user' if not provided
          otp: otp,
          otpExpiresAt: otpExpiresAt,
        });

        await newUser.save();

        const auth = nodemailer.createTransport({
          service: "gmail",
          secure: true, // true for port 465, false for other ports
          port: 465,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });
        const receiver = {
          from: `"E-Store Team" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Join E-Store - Your New Favorite Shopping Platform!",
          html: `
      <div style="font-family:sans-serif; padding:20px; background-color:#f4f4f4; border-radius:10px;">
        <h2>Hello ${firstName},</h2>
      

        <p>Thank you for registering at <strong>E-Store</strong>.</p>
        <p>To complete your registration, please use the following OTP code:</p>
        <br/>
         <h1 style="color:#007bff;">${otp}</h1>
               <p>If you didn’t try to register, you can safely ignore this email.</p>
        <br/>
        <p>Best Regards,<br/><strong>E-Store Team</strong></p>

      </div>
    `,
        };

        auth.sendMail(receiver, (error, emailResponse) => {
          if (error) {
            res.status(500).json({ message: "Not workin", error });
          } else {
            res
              .status(201)
              .json({ message: "Mail sended to user", emailResponse });
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find user
    const user = await EStoreauthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if OTP matches and is not expired
    const now = new Date();
    console.log(`User ${user.otp}, saved otp ${otp} , Date ${now}`);

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
            message: "OTP HAS BEEN EXPIRED",
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "User otpExpiresAt condtion get flase", user });
      }
    } else {
      return res.status(400).json({
        message: "OTP DOEST NOT MATCH TO THE GIVEN OTP",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addUser, verifyUser };
