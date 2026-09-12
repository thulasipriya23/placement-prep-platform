const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const User = require("./models/User");

const reset = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("Connected to MongoDB...");

    const email = (process.argv[2] || "thulasipriyarathod@gmail.com").trim().toLowerCase();
    const newPassword = process.argv[3] || "Pandu@22";

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`❌ User with email "${email}" was not found.`);
      const allUsers = await User.find({}, "name email");
      console.log("Existing users in database:", allUsers);
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log(`\n🎉 SUCCESS! Password for "${email}" has been updated to: "${newPassword}"\n`);
    process.exit(0);
  } catch (err) {
    console.error("Error resetting password:", err.message);
    process.exit(1);
  }
};

reset();
