import React from 'react'
import { Link } from 'react-router-dom'
Link

function Pnf() {
  return (
    <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center flex-column'>
      <img className='w-25' src="https://www.innonet.nl/wp-content/uploads/2017/11/Page-not-found.png" alt="page not found" />
      <h1 className='my-5'>WE ARE SORRY,LOOK LIKE YOUR LOST</h1>
      <Link to={'/'} className='btn btn-dark'>BACK TO HOME</Link>
    </div>
  )
}

export default Pnf
