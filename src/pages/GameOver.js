import React, { useEffect, useState } from 'react';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import { useScore } from '../contexts/ScoreContext';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Sven', score }),
        };
        const res = await fetch('/.netlify/functions/saveHighScore', options);
        const data = await res.json();

        if (data.id) {
          setScoreMessage('Nice! New top 10 score 👍');
        } else {
          setScoreMessage('Oh, not top ten huh? 🤨');
        }
      } catch (err) {
        console.error(err);
      }
    };
    saveHighScore();
  }, [score]);

  return (
    <div>
      <h1>GameOver</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again?</StyledLink>
    </div>
  );
}
