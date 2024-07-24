export const errorHandler = (res, status,message='somethiung went wrong')=>{
        console.log("Staus",status)
        res.send({
        staus:status,
        message:message,
        succes:false
     })
}