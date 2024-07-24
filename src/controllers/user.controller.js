import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import {errorHandler} from '../utils/apiError.js';
import {uploadFile} from '../utils/cloudnary.js'

const userController = asyncHandler(async(req,res)=>{
     
     const {fullname, username , email ,password} = req.body;
     
     if(!fullname || !username || !email || !password){
     
       return errorHandler(res,500,"ALl fileds are required ")
     }
    
     const existUser = await User.findOne({
        $or:[{email},{username}]
     })
      
      if(existUser){
        return errorHandler(res,400,'user already exist')
      } 
      
      const Localavtar =  req.files?.avtar[0]?.path;
      const Localcoverimage =  req.files?.coverimage[0]?.path;
   
       if(!Localavtar){
        return errorHandler(res,400,'Local Avatr file path needed')
       }
       
       if(!Localcoverimage){
        return errorHandler(res,400,'Local cover file path needed')
       }

       const avtar = await uploadFile(Localavtar);
       
       const coverimage = await uploadFile(Localcoverimage);
     
       
      const user = await  User.create({
         fullname,
         email,
         password,
         username:username.toLowerCase(),
         avtar:avtar.url,
         coverimage:coverimage.url,

       })
       
       console.log(user)
       const createUser = await User.findById(user._id).select("-password -refreshtoken")

       if(!createUser){
       return errorHandler(res,500,'user not  created ');
       }

      return  res.send({
        createUser
       })
       
})





export {userController}