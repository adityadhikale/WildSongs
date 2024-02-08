import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';


import '../assets/styles/LeftNavbar.css';
import home from '../assets/images/home.png';
import playlist from '../assets/images/playlist.png';
import heart from '../assets/images/heart.png';



const LeftNavbar = () => {

  const location = useLocation();
 
  

  return (
    <>
      <nav className="navbar" data-bs-theme="dark" id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" id="navbar-brand" to="/">
            <span style={{ color: '#DC1354' }}>W</span>ildSongs
          </Link>
          <ul className="navbar-nav" id="navbar-nav">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" aria-current="page" to="/">
                <div className="d-flex flex-row mb-3">
                  <img className="logos" src={home} alt="" />
                  <p className="textAlign">Home</p>
                </div>
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}>             
                <Link className="nav-link" to="/library" >
                  <div className="d-flex flex-row mb-3">
                    <img className="logos" src={playlist} alt="" />
                    <p className="textAlign">Library</p>
                  </div>
                </Link>
            </li>
            <br />
            <hr style={{ backgroundColor: 'white' }} />
            <li className={`nav-item ${location.pathname === '/liked-songs' ? 'active' : ''}`}>
              <Link className="nav-link" to="/liked-songs">
                <div className="d-flex flex-row mb-3">
                  <img className="logos" src={heart} alt="" id="heart" />
                  <p className="textAlign">Liked Song</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default LeftNavbar;
