import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/modules/game-menu.module.css";
import MainLogo from "../brand-assets/MainLogo";
import { Howl } from "howler";
import SoundOn from "../icons/SoundOn";
import MusicOn from "../icons/MusicOn";
import Link from "next/link";

function GameMenu() {
  const {
    setIsHydrated,
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

  // Use useMemo to memoize the menuMusic instance
  const menuMusic = useMemo(
    () =>
      new Howl({
        src: ["/audio/menu-music.mp3"],
        volume: 0.03,
        loop: true,
      }),
    []
  );

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

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

  const handleEffectsToggle = () => {
    toggleMutedEffects();
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

  return (
    <section className={styles.wrapper}>
      <div className={styles.menu_container_wrapper}>
        <img
          className={styles.menu_container_image}
          src="https://i.imgur.com/P63TZaA.jpg"
          alt="Background image"
        />
        <div className={styles.menu_container}>
          <div className={styles.menu}>
            <div className={styles.menu_logo}>
              <MainLogo />
            </div>
            <ul className={styles.menu_modes}>
              <li>
                <Link
                  href="/classic-mode"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">CLASSIC MODE</button>
                </Link>
              </li>
              <li>
                <Link
                  href="/skills-mode"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">SKILLS MODE</button>
                </Link>
              </li>
              <li>
                <Link
                  href="/pixel-mode"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">PIXEL MODE</button>
                </Link>
              </li>
            </ul>
            <ul className={styles.menu_settings}>
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameMenu;
