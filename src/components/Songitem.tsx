import React from 'react';

import '../assets/styles/Carditem.css';
import Heart from './Heart.js';
import { Song } from '../types.ts';
import useLoadImage from '../hooks/useLoadimage.tsx';
import PlayButton from './PlayButton.js';

interface CarditemProps {
  data: Song;
  onClick: (id: string) => void;
  userId:string;
}

const SongItem: React.FC<CarditemProps> = ({ data, onClick, userId }) => {
  const imagePath = useLoadImage(data);
  
  return (
    <div className='card my-3' style={{ width: '15rem', cursor: 'pointer' }}>
      <div
        className="card-img"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '235px',
          width:'15rem'
        }}
        onClick={() => onClick(data.id.toString())}
      ></div>
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title" style={{marginRight:'3px'}}>{data.title}</h5>
          <Heart songId={data.id} userId={userId} />
        </div>
        <p className="card-text" style={{ color: 'gray' }}>{data.author}</p>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;

