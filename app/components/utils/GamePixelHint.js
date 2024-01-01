import { useGlobal } from "@/contexts/GlobalContext";
import React, { useState, useEffect } from "react";

import styles from "@/styles/modules/game-pixel-hint.module.css";

function GamePixelHint() {
  const { wasGuessed, randomCard } = useGlobal();

  const [guessComment, setGuessComment] = useState("Nice one");

  const congratulationsMessages = [
    "Nice one",
    "Amazing",
    "You nailed it",
    "Fantastic",
    "Wow",
    "Well played",
    "Nice guess",
  ];

  const getRandomMessage = () => {
    const randomIndex = Math.floor(
      Math.random() * congratulationsMessages.length
    );
    return congratulationsMessages[randomIndex];
  };

  useEffect(() => {
    if (wasGuessed) {
      const randomMessage = getRandomMessage();
      setGuessComment(randomMessage);
    }
  }, [wasGuessed]);

  return (
    <div className={styles.image_container}>
      <img
        src={randomCard.art}
        alt="Random card"
        style={{
          transform: wasGuessed
            ? "translate(-50%, -50%) scale(1)"
            : " translate(-50%, -50%) scale(7)",
        }}
      />
    </div>
  );
}

export default GamePixelHint;
