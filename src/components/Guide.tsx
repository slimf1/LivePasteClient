import React, { useState } from 'react';
import Alert from './Alert';

const Guide: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <ul>
      <li>
        Use <kbd>ctrl</kbd> + <kbd>s</kbd> to save
      </li>
      <li>
        Test
      </li>
      <Alert show={show}>
        <p>Coucou</p>
      </Alert>
      <button onClick={() => setShow(!show)}>
        show/hide
      </button>

    </ul>
  );
}

export default Guide;
