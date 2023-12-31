import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useState } from "react";

import styles from "@/styles/modules/game-skill-hint.module.css";

function GameSkillHint() {
  const { wasGuessed, randomCard, generateRandomCard, setGuessedCardsMap } =
    useGlobal();

  const [skill, setSkill] = useState(null);

  const [guessComment, setGuessComment] = useState("Nice one");

  useEffect(() => {
    if (randomCard.ability !== null) {
      if (randomCard.ability.length === 0) {
        setGuessedCardsMap((prevMap) => ({
          ...prevMap,
          [randomCard.cid]: true,
        }));

        generateRandomCard();
        return;
      }
      console.log(randomCard.name);

      setSkill(randomCard.ability);
    }
  }, [randomCard]);

  const convertirHTML = (htmlString) => ({ __html: htmlString });

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
    <div className={styles.skill}>
      <h2>Guess the skill:</h2>
      {skill !== null && !wasGuessed && (
        <p dangerouslySetInnerHTML={convertirHTML(skill)} />
      )}
      <div
        className={styles.correct}
        style={{
          transform: wasGuessed ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <h3>{guessComment}</h3>
        <div className={styles.correct_background}>
          <img
            className={styles.menu_container_image}
            src="https://i.imgur.com/mWNY0ve.png"
            alt="Background image"
          />
        </div>
      </div>
    </div>
  );
}

export default GameSkillHint;
