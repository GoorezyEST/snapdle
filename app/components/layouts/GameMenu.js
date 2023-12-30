import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/modules/game-menu.module.css";
import MainLogo from "../brand-assets/MainLogo";
import Button from "../utils/Button";
import { Howl } from "howler";
import SoundOff from "../icons/SoundOff";
import SoundOn from "../icons/SoundOn";
import MusicOff from "../icons/MusicOff";
import MusicOn from "../icons/MusicOn";

function GameMenu() {
  const {
    setIsHydrated,
    toggleMutedMusic,
    retrieveMutedMusic,
    toggleMutedEffects,
    retrieveMutedEffects,
  } = useGlobal();

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

  const handleEffectsToggle = () => {
    if (retrieveMutedEffects()) {
      toggleMutedEffects(false);
      setAreEffectsMuted(false);
    } else {
      toggleMutedEffects(true);
      setAreEffectsMuted(true);
    }
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

  const [areEffectsMuted, setAreEffectsMuted] = useState(
    retrieveMutedEffects()
  );

  const [isMusicMuted, setIsMusicMuted] = useState(retrieveMutedMusic());

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
                <a
                  href="/classic-mode"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">CLASSIC MODE</button>
                </a>
              </li>
              <li>
                <a
                  href="/classic-mode"
                  onClick={() => handleClickSound()}
                  onMouseEnter={handleBtnHover}
                >
                  <button className="primary_cta">SKILLS MODE</button>
                </a>
              </li>
            </ul>
            <ul className={styles.menu_settings}>
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameMenu;
