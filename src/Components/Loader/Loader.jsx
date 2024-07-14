import React from 'react'

import './Loader.scss'
const Loader = () => {

  return (
    <div className='loaderContainer' >
        <div className="spinner-square">
        <div className="square-1 square"></div>
        <div className="square-2 square"></div>
        <div className="square-3 square"></div>
         </div>
    </div>
  )
}

export default Loader