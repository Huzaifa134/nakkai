const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("mongo error");
  }
};

export default connectDB;
