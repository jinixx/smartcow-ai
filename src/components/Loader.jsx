import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ delay = 0 }) => {
  const [ready, setReady] = useState(delay === 0);

  useEffect(() => {
    let timeout = 0;

    if (!ready) {
      timeout = setTimeout(() => setReady(true), delay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  <Spinner className="loader" animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
}

export default Loader;