import React, { useState } from "react";

import styles from "@/styles/modules/game-lose-modal.module.css";
import QuestionMark from "../icons/QuestionMark";
import { useGlobal } from "@/contexts/GlobalContext";

function GameLoseModal() {
  const { streak, randomCard, handleUserRestart } = useGlobal();

  //State to let the user see with which card he lost the game
  const [showLastFail, setShowLastFail] = useState(false);

  const handleShowLastFail = () => {
    setShowLastFail((prev) => !prev);
  };

  return (
    <div className={styles.lose_overlay}>
      <div className={styles.lose}>
        <h3>¡GG WP!</h3>
        <p className={styles.lose_streak}>You guessed {streak} cards</p>
        <p onClick={handleShowLastFail} className={styles.lose_last_card}>
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
          <button className={styles.restart_cta} onClick={handleUserRestart}>
            Play again
          </button>
          <button className={styles.exit_cta}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default GameLoseModal;
