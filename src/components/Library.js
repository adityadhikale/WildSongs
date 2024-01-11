import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.tsx';
import useUploadModal from '../hooks/useUploadModal.tsx';
import SongItem from './Songitem.tsx';
import useOnPlay from '../hooks/useOnPlay.tsx';

const Library = ({ songs }) => {
  const { user } = useUser();
  const location = useLocation();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs)

  const onClick = () => {
    return uploadModal.onOpen();
  };


  return (
    <div className="container">
      {(!user && location.pathname === '/library') ? (
        <p className='text-center' style={{ color: 'white', marginTop: '100px' }}>
          Please <span style={{ color: '#DC1354', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
            click here to login
          </span> and access the Library.
        </p>
      ) : (
        <>
          <div className='text-center' style={{overflow:'hidden'}}>
            <button type="button" onClick={onClick} className="btn" style={{ color: 'white', backgroundColor: '#DC1354', cursor: 'pointer', marginTop: '20px', borderRadius: '50px', border: 'none' }}>Upload Song</button>
          </div>
          <div className='cards container' style={{ marginLeft: '7%' , overflow:'hidden'}}>
            <div className='mx-4 my-4 row justify-content-center'>
              {songs.map((item, index) => (
                <div className='col-lg-3 col-md-4 col-sm-6 col-12 adjus' key={index} >
                  <SongItem onClick={(id) => { onPlay(id) }} data={item} userId={user.id} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Library;

