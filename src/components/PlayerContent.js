import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/Player.css';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import useLoadImage from '../hooks/useLoadimage.tsx';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider.js';
import usePlayer from '../hooks/usePlayer.tsx';
import useSound from 'use-sound';

const PlayerContent = ({ song, songUrl }) => {
    const imagePath = useLoadImage(song);
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <>
            <div className="d-flex player-content">
                <div className="d-flex player-details" >
                    <div className="flex-shrink-0 player-details-1" pla>
                        <img src={imagePath} alt="img" id='playerImg' />
                    </div>
                    <div className=" mx-3 auther-content">
                        <p  style={{ color: 'white' }}>{song.title || 'Unknown Title'}</p>
                        <p  style={{ color: 'gray' }}>{song.author || 'Unknown Author'}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center audio-controls' >
                    <AiFillStepBackward size={30} className='media-items' onClick={onPlayPrevious} />
                    <Icon size={30} className='media-items-play' onClick={handlePlay} />
                    <AiFillStepForward size={30} className='media-items' onClick={onPlayNext} />
                </div>
                <div className='d-flex justify-content-end mx-5 volume' >
                    <div className='d-flex align-items-center '>
                        <VolumeIcon size={22} onClick={toggleMute} className='media-items volume' />
                    </div>
                    <Slider
                        volume={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </>
    );
};

PlayerContent.propTypes = {
    song: PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
    }).isRequired,
};

export default PlayerContent;
