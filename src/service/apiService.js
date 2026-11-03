import axiosService from "../api/axiosService";

// Save resume API: called by Resume input

export const saveResumeApi = async (resumeDetails)=>{
    return await axiosService("POST","/resumes",resumeDetails)
}


export const viewResumeApi = async (resumeId) =>{
    return await axiosService("GET",`/resumes/${resumeId}`,{})
}

export const getAllResumeApi = async ()=>{
    return await axiosService('GET',`/resumes/`,{})
}

export const deleteAllResumeApi = async (resumeId)=>{
    return await axiosService('DELETE',`/resumes/${resumeId}`,{})
}

export const editAllResumeApi = async (resumeId,resumeDetails)=>{
    return await axiosService('PUT',`/resumes/${resumeId}`,resumeDetails)
}
export const downloadResumeApi = async (resumeDetails)=>{
    return await axiosService('POST',`/downloads`,resumeDetails)
}