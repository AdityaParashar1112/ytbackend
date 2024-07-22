import mongoose from "mongoose";



const dbConnection  = async()=>{
    

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected')
        
    } catch (error) {
        console.log('Error',error)
    }
}


export default dbConnection;