import React from 'react'
import {FaPlay} from 'react-icons/fa';

import '../assets/styles/PlayButton.css'

const PlayButton = () => {
  return (
   <button className='playbtn'>
    <FaPlay style={{color:'black'}}></FaPlay>
   </button>
  )
}

export default PlayButton
