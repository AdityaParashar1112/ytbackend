export const errorHandler = async(res,status,message)=>{

    res.send({
        message:message,
        status:status
    })

}