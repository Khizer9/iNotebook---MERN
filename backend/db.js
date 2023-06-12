const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://akhizer33:Khizer786110@cluster0.zzuzb2r.mongodb.net/"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
 