"use client";

import React from 'react';

import { MyUserCotextProvider } from "../hooks/useUser.tsx";

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({
    children
}) =>{
    return(
        <MyUserCotextProvider>
            {children}
        </MyUserCotextProvider>
    )
};

export default UserProvider;