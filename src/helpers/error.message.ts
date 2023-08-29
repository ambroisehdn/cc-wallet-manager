export const returnResponse = (message:string,error:boolean,data:object = {}) => {
    return {
      "error":error,
      "message":message,
    //   "data": data
    }
  }