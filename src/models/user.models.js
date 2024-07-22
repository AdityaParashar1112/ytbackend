import mongoose , {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    avtar:{
        type:String,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    coverimae:{
        type:String,
        lowercase:true,
        trim:true
    },
    watchhistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    refreshtoken:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }


},{timestamps:true})

userSchema.pre("save", async function(next){
     if(!this.isModified('password') ){
        return next();
     }
     this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.isPasswordCorrect = async function(password){
   
    return await bcrypt.compare(password,this.password);
     
}


userSchema.methods.generateAccessToken = async function(){
    jwt.sign({
        id:this._id,
        email:this.email
    },process.env.SECRET_KEY,{
        expiresIn:'2D'
    })
}


userSchema.methods.generateRefreshToken = async function(){
    jwt.sign({
        id:this._id
        
    },process.env.SECRET_KEY,{
        expiresIn:'2D'
    })
}


export const User   = mongoose.model("User",userSchema);