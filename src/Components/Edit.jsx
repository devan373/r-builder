import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { TbEditFilled } from 'react-icons/tb';
import { FaXmark } from 'react-icons/fa6';
import jobRole from '../assets/jobRole.json'
import { toast } from 'react-toastify';
import { editAllResumeApi } from '../service/apiService';
import { jsPDF } from "jspdf";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight:'80vh',
  overflowY:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Edit({resumeDetails,setresumedetails}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const skillRef =React.useRef()

  const removeSkill = (skill) =>{
    setresumedetails ( {...resumeDetails,skills:resumeDetails.skills.filter(item=>item!=skill)})
  }

  const addSkill = (skill)=>{
    if(skill){
      if(resumeDetails?.skills?.map(item=>item.toLowerCase()).includes(skill.toLowerCase())){
        toast.info("Given skill is already available,pls add another")
      }else{
        setresumedetails({...resumeDetails,skills:[...resumeDetails?.skills,skill]})
      }
        skillRef.current.value=""

  }else{
    toast.warning("Please enter valid input!!")
  }
}

const handleEditResume = async ()=>{
    const {fullname,location,job,phone,email,github,linkedin,degree,college,year,skills,summary} =resumeDetails
    if(fullname && location && job && phone && email && github && linkedin && degree && college && year && skills.length>0 && summary){
      //make api call
      const response = await editAllResumeApi(resumeDetails.id,resumeDetails)
      console.log(response);
      if(response.status === 200){
        toast.success("Resume added successfully")
        setTimeout(()=>{
          handleClose()
        },2500)
        
      }
      
    }else{
      toast.warning("Please fill the form completely!!!")
    }
  }

  const generatePDF =()=>{
    const doc = new jsPDF();
  }
  

  return (
    <div>
      <Button style={{color:'#321604'}} onClick={handleOpen}><TbEditFilled />Edit CV</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Personal Details */}
            <div>
          <h3>Personal Details</h3>
          <div className='row p-3'>
            <TextField value={resumeDetails?.fullname} onChange={e=>setresumedetails({...resumeDetails,fullname:e.target.value})} id="standard-basic" label="Full name" variant="standard" />
            <TextField value={resumeDetails?.location} onChange={e=>setresumedetails({...resumeDetails,location:e.target.value})} id="standard-basic" label="Location" variant="standard" />
            <FormControl variant='standard'>
        <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
        <Select defaultValue={resumeDetails?.job} onChange={e=>setresumedetails({...resumeDetails,job:e.target.value})}
          labelId="demo-simple-select-label"
          id="demo-simple-select"          
          label="Job"
        >


          {
            jobRole.jobRoles.map(job=>(
           <MenuItem key={job} value={job}>{job}</MenuItem>   
            ))
          }


          
          
        </Select>
      </FormControl>
          </div>
        </div>
        <div>
                  <h3>Contact Details</h3>
                  <div className='row p-3'>
                              <TextField value={resumeDetails?.email} onChange={e=>setresumedetails({...resumeDetails,email:e.target.value})} id="standard-basic-email" label="Email" variant="standard" />
                              <TextField value={resumeDetails?.phone} onChange={e=>setresumedetails({...resumeDetails,phone:e.target.value})} id="standard-basic-contactnum" label="Contact Number" variant="standard" />
                              <TextField value={resumeDetails?.linkedin} onChange={e=>setresumedetails({...resumeDetails,linkedin:e.target.value})} id="standard-basic-linkedin" label="Linkedin Link" variant="standard" />
                              <TextField value={resumeDetails?.github} onChange={e=>setresumedetails({...resumeDetails,github:e.target.value})} id="standard-basic-github" label="Github Link" variant="standard" />
                            </div>
                  </div>
                  <div>
                            <h3>Educational Details</h3>
                            <div className='row p3'>
                                        <TextField value={resumeDetails?.degree} onChange={e=>setresumedetails({...resumeDetails,degree:e.target.value})} id="standard-basic-degree" label="Bachelor's Degree" variant="standard" />
                                        <TextField value={resumeDetails?.college} onChange={e=>setresumedetails({...resumeDetails,college:e.target.value})} id="standard-basic-college" label="University/College Name" variant="standard" />
                                        <TextField value={resumeDetails?.year} onChange={e=>setresumedetails({...resumeDetails,year:e.target.value})} id="standard-basic-year" label="Year of Graduation" variant="standard" />
                                      </div>
                          </div>
                          {/* skill */}
                          <div className='mt-3'>
                            <h3>Skills</h3>
                            <div className='d-flex'>
                              <input ref={skillRef} type="text" placeholder='Add skill' className='form-control' />
                              <button onClick={()=>{addSkill(skillRef.current.value)}} className='btn'>Add</button>
                            </div>
                            <h5>Added skills :</h5>
                            <div className='p-3 d-flex justify-content-between flex-wrap'>
                              {
                                resumeDetails?.skills?.map(skill=>(
                                  <Button onClick={()=>(removeSkill(skill))} key={{skill}} variant='contained' className='my-2'>{skill}<FaXmark className='ms-3' /></Button>
                                ))
                              }
                            </div>
                          </div>
                          {/* summary */}
                          <div className='mt-3'>
                            <h3>Summary</h3>
                            <div className='row p-3'>
                              <TextField value={resumeDetails?.summary} onChange={e=>setresumedetails({...resumeDetails,summary:e.target.value})} id='summary' label='Summary' multiline variant='standard'></TextField>
                            </div>
                          </div>
                          {/* update button */}
                          <button className='btn btn-primary mt-3'>Update CV</button>
            
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit
