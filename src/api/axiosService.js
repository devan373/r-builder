import axiosInstance from "./axiosinstance";

const axiosService = async (httpmethod,url,reqBody)=>{

    try{
        const response = await axiosInstance({
        method:httpmethod,
        url,
        data:reqBody
    })
    return response
} catch (error){
    throw error
    }
}

export default axiosService