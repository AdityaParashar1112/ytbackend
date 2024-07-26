import { Router } from "express";
import { loginController, logoutController, userController } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middlware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";


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


router.post('/login',loginController);
router.post('/logout',verifyJWT,logoutController);

export {router};