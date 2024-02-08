import React from 'react'

import '../assets/styles/Player.css';
import usePlayer from '../hooks/usePlayer.tsx';
import useGetSongId from '../hooks/useGetSongById.tsx';
import useLoadSongUrl from '../hooks/useLoadSongUrl.tsx';
import PlayerContent from './PlayerContent.js';

const Player = () => {

    const player = usePlayer();
    const {song} = useGetSongId(player.activeId);

    const songUrl  = useLoadSongUrl(song);

    if(!song || !songUrl || !player.activeId){
        return null;
    }

  return (
    <div id='player'>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
