import mongoose from "mongoose";
import dotenv from "dotenv";
import Express from "express";
import dbConnection from "./db/indes.js";


dotenv.config();



dbConnection();

/*
const app = Express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


;(async () => {
  try {
  
    await mongoose.connect(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} and database connected`);
    });
  } catch (error) {
    console.log("Database not connected Error:", error);
  }
})();*/