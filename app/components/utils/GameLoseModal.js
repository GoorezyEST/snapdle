import React, { useState, useMemo } from "react";

import styles from "@/styles/modules/game-lose-modal.module.css";
import QuestionMark from "../icons/QuestionMark";
import { useGlobal } from "@/contexts/GlobalContext";
import Button from "./Button";

function GameLoseModal() {
  const { streak, randomCard, handleUserRestart, retrieveMutedEffects } =
    useGlobal();

  //State to let the user see with which card he lost the game
  const [showLastFail, setShowLastFail] = useState(false);

  const handleShowLastFail = () => {
    setShowLastFail((prev) => !prev);
  };

  const clickSound = useMemo(
    () =>
      new Howl({
        src: ["/audio/menu-click.ogg"],
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

  return (
    <div className={styles.lose_overlay}>
      <div className={styles.lose}>
        <h3>¡GG WP!</h3>
        <p className={styles.lose_streak}>You guessed {streak} cards</p>
        <p
          onClick={() => {
            handleClickSound(handleShowLastFail);
          }}
          onMouseEnter={handleBtnHover}
          className={styles.lose_last_card}
        >
          {showLastFail ? "Hide last card failed" : "Show last card failed"}
        </p>
        <div className={styles.lose_image}>
          {showLastFail ? (
            <img src={randomCard.art} alt="Random card" />
          ) : (
            <div className={styles.lose_image_svg}>
              <QuestionMark />
            </div>
          )}
        </div>
        <div className={styles.lose_ctas}>
          <span>
            <span
              onClick={() => handleClickSound(handleUserRestart)}
              onMouseEnter={handleBtnHover}
            >
              <button className="primary_cta">PLAY AGAIN</button>
            </span>
          </span>
          <span>
            <a
              href="/"
              onClick={() => handleClickSound()}
              onMouseEnter={handleBtnHover}
            >
              <button className="primary_cta">EXIT</button>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GameLoseModal;
