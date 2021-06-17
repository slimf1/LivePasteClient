import React from 'react';

interface AlertProps {
  show?: boolean;
}
const Alert: React.FC<AlertProps> = ({
  show,
  children
}) => {
  return (
    <div
      className={`alert ${!show ? 'fade-out' : 'fade-in'}`}
    >
      {children}
    </div>
  );
}

export default Alert;
