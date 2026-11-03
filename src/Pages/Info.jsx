import React from 'react'
import Resumeinput from '../Components/Resumeinput'
import Preview from '../Components/Preview'

function Info() {

  const [resumeDetails,setresumedetails]=React.useState({
    fullname:"",location:"",job:"",phone:"",email:"",github:"",linkedin:"",degree:"",college:"",year:"",skills:[],summary:""
  })

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
           <Resumeinput resumeDetails={resumeDetails} setresumedetails={setresumedetails}/> 
          </div>
          <div className="col-lg-6">
            {resumeDetails.fullname && <Preview resumeDetails={resumeDetails}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
