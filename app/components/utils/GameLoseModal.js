import React, { useState, useMemo } from "react";

import styles from "@/styles/modules/game-lose-modal.module.css";
import { useGlobal } from "@/contexts/GlobalContext";
import { copy } from "clipboard";
import GGWPIcon from "../brand-assets/GG-WP";

function GameLoseModal() {
  const { streak, randomCard, handleUserRestart, retrieveMutedEffects } =
    useGlobal();

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

  const [copied, setCopied] = useState(false);

  const textToCopy = `I got a streak of ${streak} guesses in Snapdle!\nhttps://game-snapdle.vercel.app/`;

  const handleCopyClick = () => {
    copy(textToCopy);
    setCopied(true);

    // Reset the "copied" state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.lose_overlay}>
      <div className={styles.lose}>
        <div className={styles.lose_gg}>
          <GGWPIcon />
        </div>
        <p className={styles.info_text}>
          You got a streak of <span>{streak}</span> guesses!
        </p>
        <p className={styles.info_text}>
          You lost trying to guess:
          <br />
          <span>{randomCard.name}</span>
        </p>
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
      <div className={styles.share}>
        <h2>Share it with your friends:</h2>
        <div className={styles.share_text}>
          {textToCopy.split("\n").map((part, index) => (
            <p key={index}>{part}</p>
          ))}
        </div>
        <button
          onClick={handleCopyClick}
          className="primary_cta"
          onMouseEnter={handleBtnHover}
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
    </div>
  );
}

export default GameLoseModal;
