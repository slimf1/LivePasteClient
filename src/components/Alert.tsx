import React, { useState } from 'react';

interface AlertProps {
  show?: boolean;
  onClose?: () => void;
  closeButton?: boolean;
}
const Alert: React.FC<AlertProps> = (
  props
) => {
  return (
    <div 
      className={`alert ${!props.show ? 'alert-hide' : ''}`}
    >
      {props.children}
      {props.closeButton ? 'x' : ''}
    </div>
  );
}

export default Alert;
