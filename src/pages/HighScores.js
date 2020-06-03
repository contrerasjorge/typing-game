import React, { useState, useEffect } from 'react';
import { ScoresList, ScoreLi } from '../styled/HighScores';
import { StyledTitle } from '../styled/Reusable';

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLi key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLi>
        ))}
      </ScoresList>
    </div>
  );
}
