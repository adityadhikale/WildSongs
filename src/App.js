import LoadingBar from 'react-top-loading-bar';
import React, { useEffect, useState } from 'react';
import Home from "./components/Home";
import LeftNavbar from './components/LeftNavbar';
import Library from './components/Library';
import LikedSongs from './components/LikedSongs';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import SupabaseProvider from './providers/SupabaseProvider.tsx';
import UserProvider from './providers/UserProvider.tsx';
import ModalProvider from './providers/ModalProvider.tsx';
import TosterProvider from './components/TosterProvider.js';
import getSongsByUserId from './actions/getSongsByUserId.ts';
import Player from './components/Player.js';

function App() {

  const [progress, setProgress] = useState(0);
  const [userSongs, setUserSongs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const songs = await getSongsByUserId();
        setUserSongs(songs);
      } catch (error) {
        console.error('Error fetching user songs: ', error.message);
      }
    }

    fetchData();
  }, [setUserSongs, setProgress]);

  return (
    <>
      <SupabaseProvider>
        <UserProvider>
          <LoadingBar height={3} color="#DC1354" progress={progress} />
          <TosterProvider />
          <BrowserRouter>
            <ModalProvider />
            <LeftNavbar />
            <Routes>
              <Route path="/WildSongs" element={<Home setProgress={setProgress} />} />
              <Route path="/library" element={<Library songs={userSongs} />} />
              <Route path="/liked-songs" element={<LikedSongs />} />
            </Routes>
            <Player/>
          </BrowserRouter>
        </UserProvider>
      </SupabaseProvider>
    </>
  );
}


export default App;
