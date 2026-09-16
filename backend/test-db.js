const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
  console.log("Connecting to:", process.env.MONGO_URI.split('@')[1]); // Hide password in logs
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS! Connected to Atlas.");
    process.exit(0);
  } catch(e) {
    console.error("ERROR CONNECTING TO ATLAS:", e.message);
    process.exit(1);
  }
}
test();
