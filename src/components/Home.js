import React from 'react'
import Latest from './Latest';

const Home = (props) => {

    const { setProgress } = props;

  return (
    <div>
      <Latest setProgress={setProgress} />
    </div>
  )
}

export default Home
