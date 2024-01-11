import React from 'react';
import '../assets/styles/Player.css';

const Slider = ({ value, onChange }) => {

  const handleChange = (newValue) => {
    onChange?.(newValue[0]);
  }


  return (
    <>
      <div className='d-flex align-items-center '>
        <div className="slidecontainer">
          <input
            className="slider"
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Slider;
