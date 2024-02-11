import React, { useEffect, useMemo, useState } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import styles from "@/styles/modules/guess-by-hint.module.css";
import GameDashboard from "../utils/GameDashboard";
import GameAutoSuggest from "../utils/GameAutoSuggest";
import GameLoseModal from "../utils/GameLoseModal";
import MusicOn from "../icons/MusicOn";
import SoundOn from "../icons/SoundOn";
import Return from "../icons/Return";
import GameSkillHint from "../utils/GameSkillHint";
import Link from "next/link";
import GameWinsModal from "../utils/GameWinsModal";

function GuessBySkills() {
  const {
    cardsList,
    randomCard,
    setRandomCard,
    userLoses,
    areEffectsMuted,
    setAreEffectsMuted,
    isMusicMuted,
    setIsMusicMuted,
    initialHP,
    setHp,
    generateRandomCard,
    userWins,
    setUsedReRoll,
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
      setHp(initialHP);
      generateRandomCard();
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

  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  //useEffect to handle the image loading
  useEffect(() => {
    const image = new Image();

    const handleLoadImage = () => {
      setBgImageLoaded(true);
    };

    image.src = "https://i.imgur.com/P63TZaA.jpg";

    image.onload = handleLoadImage;

    return () => {
      image.onload = null;
    };
  }, []);

  const [isViewportBelowThreshold, setIsViewportBelowThreshold] =
    useState(false);

  useEffect(() => {
    // Function to check if viewport height is below 650px
    const checkViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      const threshold = 630;
      const belowThreshold = viewportHeight < threshold;

      setIsViewportBelowThreshold(belowThreshold);
    };

    // Initial check when component mounts
    checkViewportHeight();

    // Event listener for window resize
    const handleResize = () => {
      checkViewportHeight();
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      {randomCard === null ? (
        <div className="game_loading_wrapper">
          <span>...</span>
        </div>
      ) : isViewportBelowThreshold ? (
        <div className={styles.invalid_device_wrapper}>
          <div className={styles.invalid_device}>
            <h1>Ups...</h1>
            <p>
              We regret to inform you that this game mode does not work in this
              resolution.
            </p>
            <Link href="/">
              <button>Go back</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {userLoses && <GameLoseModal />}
          {userWins && <GameWinsModal />}
          <div className={styles.game_container_wrapper}>
            <div
              className="menu_container_loading_image"
              style={{ display: bgImageLoaded ? "none" : "auto" }}
            ></div>
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
                  onClick={() => {
                    handleClickSound();
                    setUsedReRoll(false);
                  }}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">
                    <Return />
                  </button>
                </Link>
              </li>
            </ul>
            <div className={styles.game_container}>
              <GameSkillHint />
              <GameDashboard />
              <GameAutoSuggest />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GuessBySkills;
