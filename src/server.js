import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnection from "./db/indes.js";
import { app } from "./app.js";


dotenv.config();



dbConnection()
.then(()=>{
   app.listen(process.env.PORT||5000,()=>{
      console.log('server started',process.env.PORT)
   })
})
.catch((err)=>{
   console.log("Databse Connection Error",err)
});

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