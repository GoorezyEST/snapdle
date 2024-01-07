import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useState } from "react";

import styles from "@/styles/modules/game-image-hint.module.css";

function GameImageHint() {
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
        className={styles.image_blur}
        style={{
          backdropFilter: wasGuessed ? "blur(0px)" : "blur(12px)",
        }}
      ></div>
      <div
        className={styles.image_loading}
        style={{ opacity: bgImageLoaded ? "0" : "1" }}
      >
        <span class={styles.image_loading_loader}></span>
      </div>
      <img
        src={randomCard.art}
        alt="Random card"
        style={{ opacity: bgImageLoaded ? "1" : "0" }}
      />
    </div>
  );
}

export default GameImageHint;
