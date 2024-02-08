import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import logo from '../assets/images/logo.png';
import Cardrow from './Cardrow';
import '../assets/styles/Navbar.css'
import useAuthModal from '../hooks/useAuthModal.tsx';
import { useUser } from '../hooks/useUser.tsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import getSongsByTitle from '../actions/getSongsByTitle.ts';
import useDebounce from '../hooks/useDebounce.tsx';
import SearchContent from './SearchContent.js';


const Navbar = (props) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setProgress } = props;
    const AuthModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const navigate = useNavigate();
    const debounceValue = useDebounce(searchInput, 500);
    const [isSearching, setIsSearching] = useState(false);
    let prevScrollPos = window.scrollY
    const navbarRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    }



    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        const currentScrollPos = window.scrollY
        const navbar = navbarRef.current;


        if (navbar) {
            if (prevScrollPos > currentScrollPos) {
                document.getElementById("topNavbar").style.top = "0";
            } else {
                document.getElementById("topNavbar").style.top = "-80px";
            }
        }

        prevScrollPos = currentScrollPos;
    }


    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setIsSearching(true);

                const query = {
                    title: debounceValue,
                };

                // eslint-disable-next-line
                const url = queryString.stringifyUrl({
                    url: '/',
                    query: query,
                });


                const songs = await getSongsByTitle(debounceValue);
                setSearchResults(songs);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setIsSearching(false);
            }
        };

        if (debounceValue.trim() !== '') {
            const timer = setTimeout(() => {
                fetchSongs();
            }, 500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [debounceValue, navigate]);

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        navigate('/', { replace: true });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Successfully logged out!');
            // setTimeout(() => {
            //     window.location.reload();
            //   }, 2000)
        }
    };


    return (
        <>
            <nav ref={navbarRef} className="navbar" data-bs-theme="dark" id='topNavbar' >
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <button className="navbar-brand" style={{ border: 'none', backgroundColor: 'transparent', padding: '0', cursor: 'pointer' }}>
                                <img src={logo} alt="WildTrack" style={{ width: '35px' }} />
                            </button>
                        </div>
                        <form className="d-flex flex-grow-1" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Music, Artist and Podcasts"
                                aria-label="Search"
                                style={{ width: '100%', border: 'none', backgroundColor: 'rgb(21, 25, 25)', fontFamily: 'Quicksand' }}
                                value={searchInput}
                                onChange={(event) => { setSearchInput(event.target.value) }}
                            />
                            {user ? (
                                <button type="button"
                                    className="btn mx-3"
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'rgb(21, 25, 25)',
                                        color: 'white',
                                    }}
                                    onClick={handleLogout}
                                >
                                    logout
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn mx-3"
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#DC1354',
                                        color: 'white',
                                    }}
                                    id='loginbtn'
                                    onClick={AuthModal.onOpen}
                                >
                                    login
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </nav>

            <div id="cardrow">
                {isSearching ? (
                    <div class="text-center">
                        <div class="spinner-border " role="status" style={{ color: '#DC1354' }}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : searchResults.length > 0 ? (
                    <SearchContent songs={searchResults} setProgress={setProgress} />
                ) : (
                    <>
                        <div className='container'>
                            <Cardrow setProgress={setProgress} />
                            <div style={{ height:'100px'}}/>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
