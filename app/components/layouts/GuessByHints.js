import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/modules/guess-by-hint.module.css";
import GameDashboard from "../utils/GameDashboard";
import GameAutoSuggest from "../utils/GameAutoSuggest";
import GameImageHint from "../utils/GameImageHint";
import GameLoseModal from "../utils/GameLoseModal";
import MusicOn from "../icons/MusicOn";
import SoundOn from "../icons/SoundOn";
import Return from "../icons/Return";
import Link from "next/link";

function GuessByHints() {
  const {
    cardsList,
    randomCard,
    setRandomCard,
    userLoses,
    areEffectsMuted,
    setAreEffectsMuted,
    isMusicMuted,
    setIsMusicMuted,
  } = useGlobal();

  const toggleMutedMusic = () => {
    setIsMusicMuted((prev) => !prev);
  };

  const toggleMutedEffects = () => {
    setAreEffectsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (cardsList !== null && randomCard === null) {
      setRandomCard(cardsList[Math.floor(Math.random() * cardsList.length)]);
    }
  }, [cardsList]);

  const { setIsHydrated } = useGlobal();

  // Use useMemo to memoize the menuMusic instance
  const menuMusic = useMemo(
    () =>
      new Howl({
        src: ["/audio/game-music.mp3"],
        volume: 0.03,
        loop: true,
      }),
    []
  );

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isMusicMuted) {
      menuMusic.play();
      setIsPlaying(true);
    }

    return () => {
      menuMusic.stop();
    };
  }, []);

  const handleMusicToggle = () => {
    if (isPlaying) {
      menuMusic.stop();
      toggleMutedMusic();
    } else {
      menuMusic.play();
      toggleMutedMusic();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (randomCard !== null) {
      setIsHydrated(true);
    }
  }, [randomCard]);

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

  const handleEffectsToggle = () => {
    toggleMutedEffects();
  };

  return (
    <section className={styles.wrapper}>
      {randomCard === null ? (
        <h1 style={{ color: "white" }}>CARGANDO</h1>
      ) : (
        <div className={styles.container}>
          {userLoses && <GameLoseModal />}
          <div className={styles.game_container_wrapper}>
            <img
              className={styles.game_container_image}
              src="https://i.imgur.com/P63TZaA.jpg"
              alt="Background image"
            />
            <ul className={styles.game_settings}>
              <li>
                <span
                  onClick={() => handleClickSound(handleMusicToggle)}
                  onMouseEnter={handleBtnHover}
                >
                  <button
                    className="primary_cta"
                    style={{
                      filter: isMusicMuted ? "grayscale(1)" : "grayscale(0)",
                    }}
                  >
                    <MusicOn />
                  </button>
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleClickSound(handleEffectsToggle)}
                  onMouseEnter={handleBtnHover}
                >
                  <button
                    className="primary_cta"
                    style={{
                      filter: areEffectsMuted ? "grayscale(1)" : "grayscale(0)",
                    }}
                  >
                    <SoundOn />
                  </button>
                </span>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">
                    <Return />
                  </button>
                </Link>
              </li>
            </ul>
            <div className={styles.game_container}>
              <GameImageHint />
              <GameDashboard />
              <GameAutoSuggest />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GuessByHints;
