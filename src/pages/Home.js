import React, { useEffect } from 'react';
import CTA from '../styled/CTA';
import { Accent, StyledTitle } from '../styled/Reusable';

export default function Home({ history }) {
  useEffect(() => {
    window.addEventListener('keypress', downHandler);

    function downHandler(key) {
      if (key.key === 's') {
        history.push('/game');
      }
    }

    return () => {
      window.removeEventListener('keypress', downHandler);
    };
  }, [history]);

  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </div>
  );
}
