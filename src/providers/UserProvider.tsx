"use client";

import { MyUserCotextProvider } from "../hooks/useUser.tsx";
import React from 'react';

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