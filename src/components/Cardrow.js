import PageContent from './PageContent.js';
import React, { useState, useEffect } from 'react';
import getSongs from '../actions/getSongs.ts'


const Cardrow = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getSongs();
        setSongs(songsData);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);



  return (
    <>
      <div className='container'>
        <PageContent songs={songs} />
      </div>
    </>
  );
};


export default Cardrow;