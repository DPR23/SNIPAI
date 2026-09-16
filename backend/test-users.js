const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({});
  console.log("Users in DB:", users);
  process.exit(0);
}
test();
