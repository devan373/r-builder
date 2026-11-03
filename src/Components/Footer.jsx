import React from 'react'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'

function Footer() {
  return (
    <div style={{backgroundColor:'black',height:"300px"}} className='container-fluid text-light p-5'>
      <div className="row">
        <div className="col-lg-4">
          <h4 className='mb-5'>AI rBUILDER</h4>
          <p>An AI Powered Resume Builder is a web application that helps users create professional resumes quickly and efficiently using artificial intelligence. Traditional resume creation can be time-consuming and difficult, especially for freshers who may not know the correct format or keywords required for modern recruitment systems.</p>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-4 mt-3">
          <h4>Contact Us</h4>
          <p><MdOutlineMail />resumebulder@gmail.com</p>
          <p><FaPhoneAlt />9836472836</p>
          <h4>Connect With Us</h4>
        
        <div>
          <FaInstagram />
          <FaFacebook className='mx-3' />
          <FaWhatsapp />
        </div>  
        </div>
      </div>
      <h4 className='text-center mt-2'>Designed & built with ❤️ using React</h4>
    </div>
  )
}

export default Footer
