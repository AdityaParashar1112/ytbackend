class apiResponse{
  
     constructor(statusCode,message="sucess",data){
        this.statusCode = statusCode<400;
        this.message = message;
        this.data = data
     }
}



export {apiResponse}