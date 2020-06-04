import React, { useEffect, useState } from 'react';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import { useScore } from '../contexts/ScoreContext';
import { StyledTitle } from '../styled/Reusable';
import { useAuth0 } from '../auth';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');
  const { getTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    let mounted = true;

    const saveHighScore = async () => {
      try {
        const token = await getTokenSilently();
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Paul', score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score, isAuthenticated, getTokenSilently]);

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <h2>You should log in or signup to compete for high scores!</h2>
      )}
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
