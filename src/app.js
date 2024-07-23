import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/user.routes.js";

const app = Express();


app.use(Express.json({limit:'16kb'}));
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true

}))
app.use(cookieParser());
app.use(Express.static("public"))



app.use('/api/v1/user',router);


export {app};