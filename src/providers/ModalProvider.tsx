"use client";

import React,{ useEffect, useState } from "react";

import AuthModal from "../components/AuthModal.js";
import UploadModal from "../components/UploadModal.js";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return (
    <>
        <AuthModal/>
        <UploadModal/>
    </>
    );

}

export default ModalProvider;
