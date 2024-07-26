import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import {errorHandler} from '../utils/errorHandler.js';
import {uploadFile} from '../utils/cloudnary.js';


const userController = asyncHandler(async(req,res)=>{
     
     const {fullname, username , email ,password,refreshtoken} = req.body;
     
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
         refreshtoken
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



const generateAccessAndRefreshToken = async(userID)=>{

  try {
     
    const user = await User.findById(userID);
    
    const Access_Token = await user.generateAccessToken();
    const Refresh_Token = await user.generateRefreshToken();

    await user.save({validateBeforeSave:false})
   
    return {Access_Token,Refresh_Token};
    
  } catch (error) {
    errorHandler(res,401,'There is mistmatcg ibn refresh and aces token ');
  }
   
}


const loginController = asyncHandler(async(req,res,next)=>{
  
    const {email,password} = await req.body;
    
    if(!email || !password){
       errorHandler(res,500,'email and password is required');
    }

   const user =  await User.findOne({email});
 

   if(!user){
    errorHandler(res,401,'Sign Up First');
   }

   const checkPassword = await user.isPasswordCorrect(password);
   
   if(!checkPassword){
    errorHandler(res,401,'Password Incorrect');
   }
   
   const {Refresh_Token,Access_Token} = await generateAccessAndRefreshToken(user._id);
   
   const loggedInUser = await User.findById(user._id).select("-password");
   console.log(loggedInUser)
   const option = {
      httpOnly:true,
      secure:true
   }
    
    
   await User.findByIdAndUpdate(user._id,{
      $set :{
        refreshtoken:Refresh_Token
      }
    })
    await user.save();
   /*return res.staus(200).cookie("AccesToken",Access_Token,option).cookie("RefereshTOken",Refresh_Token,option).json({
      Data:{loggedInUser,Access_Token,Refresh_Token},
      message:"user login succesfully "
   });*/
   return res.status(200)
    .cookie("AccessToken", Access_Token, option)
    .cookie("RefreshToken", Refresh_Token, option)
    .json({
        Data: {
            loggedInUser,
            Access_Token,
            Refresh_Token
        }
    });



})


const logoutController = async(req,res)=>{
  const user = req.user;
  console.log(user)
  await User.findByIdAndUpdate(user._id,{
     $set:{
      refreshtoken:null
     }
  })
  console.log(user)
  await user.save();
  res.status(200).clearCookie("AccesToken").clearCookie("RefreshToken").json({
         message:"User logoout succesfully "
  })

}


export {userController,loginController,logoutController}