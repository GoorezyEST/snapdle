import React, { useState, useMemo } from "react";

import styles from "@/styles/modules/game-lose-modal.module.css";
import { useGlobal } from "@/contexts/GlobalContext";
import { copy } from "clipboard";
import GGWPIcon from "../brand-assets/GG-WP";
import { usePathname } from "next/navigation";

function GameLoseModal() {
  const { streak, randomCard, handleUserRestart, areEffectsMuted } =
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
    if (!areEffectsMuted) {
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
    if (!areEffectsMuted) {
      hoverSound.play();
    }
  };

  const [copied, setCopied] = useState(false);

  const currentPath = usePathname();

  const transformPath = (input) => {
    const transformedString = input.replace(/^\//, "").replace(/-/g, " ");

    const capitalizedString = transformedString.replace(
      /\b\w/g,
      (firstLetter) => firstLetter.toUpperCase()
    );

    return capitalizedString;
  };

  const partOfText = `I got a streak of ${streak} guesses in the "${transformPath(
    currentPath
  )}" of Snapdle! `;

  const textToCopy = `I got a streak of ${streak} guesses in the "${transformPath(
    currentPath
  )}" of Snapdle!\nhttps://snapdle-game.vercel.app/`;

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
        <h1 className={styles.mobile_gg}>GG WP</h1>
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
              <button className="primary_cta">RESTART</button>
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
          <p>{partOfText}</p>
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
