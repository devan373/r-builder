import React, { useEffect, useRef, useState } from 'react'
import { FaFileDownload,FaBackward } from "react-icons/fa";
import Edit from '../Components/Edit';
import { Link, useParams } from 'react-router-dom';
import { IoDocumentText } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import Preview from '../Components/Preview';
// cspell:ignore downloadresume
import { viewResumeApi } from '../service/apiService';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


function View() {

const [resume,setResume] = useState() 

const previewRef = useRef()

const {id} = useParams()

useEffect(()=>{
  getResumeDetails()
},[])



const getResumeDetails = async () =>{
  const response = await viewResumeApi(id)
  if(response.status===200){
    setResume(response.data)
  }
}

const downloadCV = async()=>{
  const previewTag = previewRef.current
  const canvas = await html2canvas(previewTag)
  canvas.toBlob(async(imgFile)=>{
    if (!imgFile) return

    // create formdata to send file via api
    const formData = new FormData()
    formData.append("file",imgFile)
    formData.append("upload_preset","rbuilder")
    const result = await fetch("https://api.cloudinary.com/v1_1/fsx2bxvg/image/upload",{
      method:"POST",
      body:formData
    })
    const serverData = await result.json()
    const url = serverData.secure_url
    generatePDF(canvas, url)
  }, "image/png")
}

 const generatePDF = async (canvas, resumeImage) =>{
      const pdf = new jsPDF()
      const imageWidth = pdf.internal.pageSize.getWidth()
      const imageHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imageWidth, imageHeight)
      const today = new Date()
      const timestamp = today.toLocaleString()

      const result = await downloadresumeApi({
        timestamp,
        resumeimg: resumeImage,
        resumeid: resume.id,
        jobrole: resume.jobrole
      })
      if (result.status === 201) {
        pdf.save(`${resume.fullname}CV.pdf`)
      }
    }


  return (
    <div className='container my-5'>
      <div className='row'>
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          {/* Navigation Icons */}
          <div className='d-flex justify-content-center align-items-center'>
            {/* Download */}
            <button onClick={downloadCV} style={{color:'#171412'}} className='btn mx-2'><FaFileDownload /> Download CV</button>
            {/* Edit */}
            <Edit resumeDetails={resume} setResumeDetails={setResume}/>
            {/* All Resumes */}
            {/* <Link style={{color:'#171412'}} to={'/all-resumes'} className='btn mx-2'><IoDocumentText /> All Resumes</Link> */}
            {/* Download History */}
            {/* <Link style={{color:'#171412'}} to={'/downloads'} className='btn mx-2'><IoMdRefresh /> Download History</Link> */}
            {/* Back */}
            <Link style={{color:'#171412'}} to={'/resume-details'} className='btn mx-2'><FaBackward /> Previous</Link>
          </div>
          <div ref={previewRef} className='p-5'>
            <Preview resumeDetails={resume}/>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  )
}

export default View