import React, {  useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser.tsx';
import { useLocation } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import SongItem from './Songitem.tsx';
import getLikedSongs from '../actions/getLikedSongs.ts';
import useOnPlay from '../hooks/useOnPlay.tsx';

const LikedSongs = () => {

  const { user } = useUser();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false)
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart
  const [userLikedSongs, setUserLikedSongs] = useState([]);
  const onPlay = useOnPlay(userLikedSongs);

  useEffect(() => {

    async function fetchLikedData() {
      try {
        const likedSongs = await getLikedSongs();
        setUserLikedSongs(likedSongs);
      } catch (error) {
        console.error('Error fetching user songs: ', error.message);
      }
    }

    fetchLikedData();
  }, [ setUserLikedSongs]);



  const handleLike = () =>{
    if(isLiked === true){
      setIsLiked(false)
    }else{
      setIsLiked(true)
    }
  }

  if (!user && location.pathname === '/liked-songs') {
    return (
      <p className='text-center' style={{ color: 'white', marginTop: '100px' }}>
        Please <span style={{ color: '#DC1354', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
          click here to login
        </span> to get your liked Song.
      </p>
    )
  }

  if(userLikedSongs.length === 0){
    return(
      <div className='text-center' style={{marginTop:'10%'}}>
        <p style={{color:'gray'}}>No liked songs yet</p>
      </div>
    )
  }

  return (
    <>
      <div className='container'style={{color:'white',  marginTop:'15px'}}>
        <Icon color={isLiked ? '#DC1354' : 'gray'} style={{marginLeft:'10%', cursor:'pointer'}} size={40} onClick={handleLike} /> Liked Songs
      </div>
      <hr style={{color:'gray', marginLeft:'15%', width:'75%' }} />
      <div className='cards container' style={{marginLeft:'13%'}}>
            <div className='mx-4 my-4 row justify-content-center'>
            {userLikedSongs.map((item, index) => (
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 adjus' key={index} >
                            <SongItem onClick={(id) => { onPlay(id) }} data={item} userId={user.id}/>
                        </div>
                    ))}
            </div>
        </div>
    </>
  );
};



export default LikedSongs;
