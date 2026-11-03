import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '90vw',
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Download() {
  const [open, setOpen] = React.useState(false)
  const [downloadList, setDownloadList] = React.useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [label, setLabel] = React.useState([])
  const [value, setValue] = React.useState([])

  const colorPalette = ['#0e335f', '#ec9b59', '#1aecec', '#4b280c', '#3FA7D6', '#59CD90']
  const backgroundColor = label.map((_, index) => colorPalette[index % colorPalette.length])

  const datasets = {
    labels: label,
    datasets: [{
      label: 'Downloads',
      data: value,
      backgroundColor,
    }],
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Downloaded Resume History</h1>
        <button className='btn text-light' onClick={handleOpen}>view in chart</button>
      </div>
      <p className='mt-3 fs-3 fw-semibold text-primary'>Total resume download from our site</p>
      <div className="row my-5">
        {downloadList.length > 0 ? (
          downloadList.map((resume) => (
            <div className="col-lg-4" key={resume?.resumeId}>
              <div className="rounded shadow p-3" style={{ height: '350px' }}>
                <h6>Review at : {resume?.timeStamp}</h6>
                <div className="mt-4 text-center">
                  <Link to={`/resume/${resume?.resumeId}`}>
                    <img className="w-100" style={{ height: '300px' }} src={resume?.resumeImg} alt="resume image" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No resumes downloaded yet</div>
        )}
      </div>
      {/* modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Resume Download Chart
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Download history and chart information will appear here.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Download
