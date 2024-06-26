import { useEffect } from 'react';

const useCtrlCListener = (handler) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Detect Ctrl+C or Cmd+C without blocking default behavior
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        handler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler]); // Re-run the effect if handler changes
};

export default useCtrlCListener;

//usage

import React, { useState } from 'react';
import useCtrlCListener from './useCtrlCListener';

const CtrlCComponent = () => {
  const [message, setMessage] = useState('');

  useCtrlCListener((event) => {
    setMessage('Ctrl+C (or Cmd+C) pressed!');
    console.log('Ctrl+C detected:', event);
  });

  return (
    <div>
      <p>Try pressing Ctrl+C (or Cmd+C on Mac) on this page. The standard copy behavior should still work.</p>
      <p>{message}</p>
      <textarea defaultValue="Try copying this text"></textarea>
    </div>
  );
};

export default CtrlCComponent;