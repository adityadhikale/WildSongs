import React from 'react';

const Modal = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <>
            <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen} style={{ backgroundColor: 'black', display: isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" data-bs-theme="dark" style={{ color: 'white' }}>
                    <div className="modal-content bg-dark">
                        <div className="modal-header " style={{ border: 'none' }}>
                            <h1 className="modal-title fs-4 text-center" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onChange}></button>
                        </div>
                        <div className="modal-body" >
                            <div className='text-center '>
                                {description}
                            </div>
                            <div className=' my-4'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
