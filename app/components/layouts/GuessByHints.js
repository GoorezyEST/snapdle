import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/modules/guess-by-hint.module.css";
import GameDashboard from "../utils/GameDashboard";
import GameAutoSuggest from "../utils/GameAutoSuggest";
import GameImageHint from "../utils/GameImageHint";
import GameLoseModal from "../utils/GameLoseModal";
import MusicOff from "../icons/MusicOff";
import MusicOn from "../icons/MusicOn";
import SoundOff from "../icons/SoundOff";
import SoundOn from "../icons/SoundOn";
import Return from "../icons/Return";

function GuessByHints() {
  const {
    cardsList,
    randomCard,
    setRandomCard,
    userLoses,
    toggleMutedMusic,
    retrieveMutedMusic,
    toggleMutedEffects,
    retrieveMutedEffects,
  } = useGlobal();

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
    if (!retrieveMutedMusic()) {
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
      toggleMutedMusic(true);
      setIsMusicMuted(true);
    } else {
      menuMusic.play();
      toggleMutedMusic(false);
      setIsMusicMuted(false);
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

  const handleEffectsToggle = () => {
    if (retrieveMutedEffects()) {
      toggleMutedEffects(false);
      setAreEffectsMuted(false);
    } else {
      toggleMutedEffects(true);
      setAreEffectsMuted(true);
    }
  };

  const [areEffectsMuted, setAreEffectsMuted] = useState(
    retrieveMutedEffects()
  );

  const [isMusicMuted, setIsMusicMuted] = useState(retrieveMutedMusic());

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
                  <button className="primary_cta">
                    {isMusicMuted ? <MusicOff /> : <MusicOn />}
                  </button>
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleClickSound(handleEffectsToggle)}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">
                    {areEffectsMuted ? <SoundOff /> : <SoundOn />}
                  </button>
                </span>
              </li>
              <li>
                <a
                  href="/"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">
                    <Return />
                  </button>
                </a>
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
