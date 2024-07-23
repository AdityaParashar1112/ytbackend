import {asyncHandler} from '../utils/asyncHandler.js'


const userController = asyncHandler(async(req,res)=>{
  
     await res.status(200).json({
        message:"Chai Aur Code "
     })
})





export {userController}