import { Button, Divider } from '@mui/material'
import React from 'react'

function Preview({resumeDetails}) {
  return (
    <div className='w-100'>
      <h2>{ resumeDetails?.fullname}</h2>
      <p className="fs-5 lh-1">Phone:{resumeDetails?.phone}</p>
      <p className="fs-5 lh-1">Email:{resumeDetails?.email}</p>
      <p className="fs-5 lh-1">Linkedin:{resumeDetails?.linkedin}</p>
      <p className="fs-5 lh-1">Github:{resumeDetails?.github}</p>
      <p className="fs-5 lh-1">Location:{resumeDetails?.location}</p>      
      <Divider className='bg-dark mb-3'/>
      <h2>Professional Summary</h2>
      <p>{resumeDetails?.summary}</p>
      <Divider className='bg-dark mb-3'/>
      <h2>Technical Skills</h2>
      {
        resumeDetails?.skills?.map(skill=>(
          <span><Button variant='text' className='bg-dark text-light rounded m-2'>{skill}</Button></span>
        ))
      }
      <Divider className='bg-dark mt-3'/>
      <p>Bachelor's Degree In:{resumeDetails?.degree}</p>
      <p>University/College Name:{resumeDetails?.college}</p>
      <p>Year od Graduation:{resumeDetails?.year}</p>
    </div>
  )
}

export default Preview
