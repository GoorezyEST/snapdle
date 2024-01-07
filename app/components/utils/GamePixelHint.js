import { useGlobal } from "@/contexts/GlobalContext";
import React, { useState, useEffect } from "react";

import styles from "@/styles/modules/game-pixel-hint.module.css";

function GamePixelHint() {
  const { wasGuessed, randomCard } = useGlobal();

  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  //useEffect to handle the image loading
  useEffect(() => {
    setBgImageLoaded(false);

    const image = new Image();

    const handleLoadImage = () => {
      setBgImageLoaded(true);
    };

    image.src = randomCard.art;

    image.onload = handleLoadImage;

    return () => {
      image.onload = null;
    };
  }, [randomCard.art]);

  return (
    <div className={styles.image_container}>
      <div
        className={styles.image_loading}
        style={{ opacity: bgImageLoaded ? "0" : "1" }}
      >
        <span class={styles.image_loading_loader}></span>
      </div>
      <img
        src={randomCard.art}
        alt="Random card"
        style={{
          transform: wasGuessed
            ? "translate(-50%, -50%) scale(1)"
            : " translate(-50%, -50%) scale(7)",
          opacity: bgImageLoaded ? "1" : "0",
        }}
      />
    </div>
  );
}

export default GamePixelHint;
