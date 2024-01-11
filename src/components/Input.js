import React, { forwardRef } from 'react';

const Input = forwardRef(({ className, type, disabled, ...props }, ref) => {
  
  const inputClasses = `form-control ${className || ''}`;

  return (
    <input ref={ref} className={inputClasses} type={type} disabled={disabled} {...props} style={{margin:'10px 0px'}} />
  );
});

Input.displayName = "Input";

export default Input;
