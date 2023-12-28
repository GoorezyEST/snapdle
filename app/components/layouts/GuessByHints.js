import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect } from "react";
import styles from "@/styles/modules/guess-by-hint.module.css";
import GameDashboard from "../utils/GameDashboard";
import GameAutoSuggest from "../utils/GameAutoSuggest";
import GameImageHint from "../utils/GameImageHint";
import GameLoseModal from "../utils/GameLoseModal";

function GuessByHints() {
  const { cardsList, randomCard, setRandomCard, userLoses } = useGlobal();

  useEffect(() => {
    if (cardsList !== null && randomCard === null) {
      setRandomCard(cardsList[Math.floor(Math.random() * cardsList.length)]);
    }
  }, [cardsList]);

  const { setIsHydrated } = useGlobal();

  useEffect(() => {
    if (randomCard !== null) {
      setIsHydrated(true);
    }
  }, [randomCard]);

  return (
    <section className={styles.wrapper}>
      {randomCard === null ? (
        <></>
      ) : (
        <div className={styles.container}>
          {userLoses && <GameLoseModal />}
          <div className={styles.game_container}>
            <GameImageHint />
            <GameDashboard />
            <GameAutoSuggest />
          </div>
        </div>
      )}
    </section>
  );
}

export default GuessByHints;
