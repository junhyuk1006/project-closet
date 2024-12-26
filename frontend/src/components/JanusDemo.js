import React, { useEffect } from 'react';
import Janus from 'janus-gateway';

const JanusDemo = () => {
  useEffect(() => {
    // Janus 초기화
    Janus.init({
      debug: 'all',
      callback: () => {
        console.log('Janus initialized');
      },
    });

    const janus = new Janus({
      server: 'https://your-janus-server.com/janus',
      success: () => {
        console.log('Connected to Janus server');
      },
      error: (error) => {
        console.error('Janus error:', error);
      },
    });
  }, []);

  return <div>Janus Gateway Example</div>;
};

export default JanusDemo;
