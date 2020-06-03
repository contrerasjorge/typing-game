import React, { useEffect, useState } from 'react';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import { useScore } from '../contexts/ScoreContext';
import { StyledTitle } from '../styled/Reusable';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    let mounted = true;

    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Jimmy', score }),
        };
        const res = await fetch('/.netlify/functions/saveHighScore', options);
        const data = await res.json();

        if (mounted) {
          if (data.id) {
            setScoreMessage('Nice! New top 10 score 👍');
          } else {
            setScoreMessage('Oh, not top ten huh? 🤨');
          }
        }
        return () => (mounted = false);
      } catch (err) {
        console.error(err);
      }
    };
    saveHighScore();
  }, [score]);

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again?</StyledLink>
      </div>
    </div>
  );
}
