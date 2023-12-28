import { useGlobal } from "@/contexts/GlobalContext";
import React from "react";

import styles from "@/styles/modules/game-image-hint.module.css";

function GameImageHint() {
  const { wasGuessed, randomCard } = useGlobal();

  return (
    <div className={styles.image_container}>
      <div
        className={styles.image_blur}
        style={{
          backdropFilter: wasGuessed ? "blur(0px)" : "blur(12px)",
        }}
      ></div>
      <img src={randomCard.art} alt="Random card" />
    </div>
  );
}

export default GameImageHint;
