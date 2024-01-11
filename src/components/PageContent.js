import React from 'react';
import '../assets/styles/Cardrow.css';
import SongItem from './Songitem.tsx';
import { useUser } from '../hooks/useUser.tsx';
import useOnPlay from '../hooks/useOnPlay.tsx';

const PageContent = ({ songs }) => {

    const { user } = useUser();

    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className='text-center' style={{ color: 'white' }}>
                No Songs
            </div>
        );
    }


    return (
        <>
            <div className='cards container'>
                <div className='mx-4 my-4 row justify-content-center'>
                    {songs.map((item, index) => (
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 adjus' key={index} >
                            {user && (
                                <SongItem onClick={(id) => { onPlay(id) }} data={item} userId={user.id} />
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PageContent;
