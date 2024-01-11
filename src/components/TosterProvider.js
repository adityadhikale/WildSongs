import React from 'react'
import { Toaster } from 'react-hot-toast'

const TosterProvider = () => {
    return (
        <>
         <Toaster 
         toastOptions={{
            style:{
                background: '#333',
                color:'#fff'
            }
         }}
         />
        </>
    )
}

export default TosterProvider
