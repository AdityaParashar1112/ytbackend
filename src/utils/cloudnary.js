import {v2 as cloudnary} from 'cloudinary';
import fs from 'fs';


cloudnary.config({ 
    cloud_name:'dmrpbxllo',
    api_key:'992431679121155', 
    api_secret: 'coTJJkirMLqUA7yPENYCG6ih3J8' // Click 'View Credentials' below to copy your API secret
});

const uploadFile = async(localfile)=>{
   
    try {
       
     if(!localfile){ return null;}
     
     const response = await cloudnary.uploader.upload(localfile,{
        resource_type:'auto'
     })
      
      console.log("file upload succesfullyyy  ",response.url)
      fs.unlinkSync(localfile);
      return response;
    } catch (error) {
        fs.unlinkSync(localfile);
        return error;

    }
}


export {uploadFile}