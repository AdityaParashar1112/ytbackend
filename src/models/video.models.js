import mongoose , {Schema} from "mongoose";
import paginated from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({

    videofile:{
        type:String,

    },
    thubmail:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    duration:{
        type:Number
    },
    isPublished:{
        type:Boolean,
        default:'true'
    },
    views:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    

},{timestamps:true});


videoSchema.plugin(paginated);

export const Video = mongoose.model("Video",videoSchema)