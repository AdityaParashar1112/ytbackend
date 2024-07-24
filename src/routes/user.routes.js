import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middlware.js'


const router = Router();

router.post('/register',upload.fields([
    {
       name:"avtar",
       maxcount:1
    },
    {
        name:"coverimage",
        maxcount:1
    }
]) , userController)



export {router};