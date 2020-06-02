import React, { useState, useEffect } from 'react';
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Reusable';

export default function Game({ history }) {
  const MAX_SECONDS = 5;

  const [score, setScore] = useState(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSString = ('0000' + msPassedStr).slice(-5);
    // 00000 - first 2 are the seconds, last 3 are the ms that have passed
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    setSeconds(updatedSeconds.toString().padStart(2, '0'));
    setMs(updatedMs.toString().padStart(3, '0'));
  };

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/gameOver');
    }
  }, [seconds, ms, history]);

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
