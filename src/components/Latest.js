import React, { useState } from 'react';
import '../assets/styles/Latest.css';
import music from '../assets/images/music.jpg'
import Navbar from './Navbar';

const placeholderImage = music;
const originalImage = 'https://source.unsplash.com/1200x675/?music,song,speakers,dance';


const Latest = (props) => {
    const [imageSource, setImageSource] = useState(originalImage); 

    const handleImageLoad = (event) => {
        const imageHeight = event.target.clientHeight;

        const gradientDiv = document.getElementById('gradent-div');
        if (gradientDiv) {
            gradientDiv.style.height = `${imageHeight}px`;
        }
    };

    const handleImageError = () => {
        setImageSource(placeholderImage); 
    };

    return (
        <>
            <div style={{ width: '100%' }}>
                <div id='gradent-div'>
                    <img
                        src={imageSource}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className="d-block w-100"
                        alt="Latest Music - WildTrack"
                        id='latestImg'
                    />
                </div>

                <div id='adjus'>
                    <h2 className="card-title latest-title">
                        Listen to the Latest Songs on{' '}
                        <span style={{ color: '#DC1354', fontWeight: 'bolder' }}>W</span>ildSongs!
                    </h2>
                </div>

                <Navbar setProgress={props.setProgress} />
            </div>
        </>
    );
};

export default Latest;

