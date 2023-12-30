import { useGlobal } from "@/contexts/GlobalContext";
import React, { useMemo } from "react";

import styles from "@/styles/modules/game-dashboard.module.css";
import { HealthPoint } from "../icons/HealthPoint";
import ReRollIcon from "../icons/ReRollIcon";

function GameDashboard() {
  const {
    cardsList,
    hp,
    streak,
    usedReRoll,
    setUsedReRoll,
    randomCard,
    setRandomCard,
    guessedCardsMap,
    setGuessedCardsMap,
    retrieveMutedEffects,
  } = useGlobal();

  const generateRandomCard = () => {
    if (cardsList !== null) {
      // Filter out the guessed cards
      const availableCards = cardsList.filter(
        (card) => !guessedCardsMap[card.cid]
      );
      // Get a random card from the available cards
      const newRandomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      setRandomCard(newRandomCard);
    }
  };

  const clickSound = useMemo(
    () =>
      new Howl({
        src: ["/audio/re-roll.ogg"],
        volume: 0.03,
      }),
    []
  );

  const handleClickSound = (callback) => {
    if (!retrieveMutedEffects()) {
      clickSound.play();
    }

    if (callback) {
      callback();
    }
  };

  const hoverSound = useMemo(
    () =>
      new Howl({
        src: ["/audio/menu-hover.ogg"],
        volume: 0.02,
      }),
    []
  );

  const handleBtnHover = () => {
    if (!retrieveMutedEffects()) {
      hoverSound.play();
    }
  };

  //Allow user one re roll per game if he dont know the card
  const reRoll = () => {
    setGuessedCardsMap((prevMap) => ({
      ...prevMap,
      [randomCard.cid]: true,
    }));

    setUsedReRoll(true);

    generateRandomCard();
  };

  return (
    <div className={styles.information}>
      <div className={styles.health}>
        {hp.map((item, index) => (
          <div
            key={index}
            className={`${styles.health_item} ${
              !item && styles.health_item_lost
            }`}
          >
            <HealthPoint color="var(--accent)" />
          </div>
        ))}
      </div>
      <div className={styles.streak}>
        <p>
          Guessed cards <span>{streak}</span>
        </p>
      </div>
      <button
        onMouseEnter={handleBtnHover}
        onClick={() => {
          handleClickSound(reRoll);
        }}
        disabled={usedReRoll}
        className={`${styles.reroll_cta}`}
      >
        <ReRollIcon />
      </button>
    </div>
  );
}

export default GameDashboard;
