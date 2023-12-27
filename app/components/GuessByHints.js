import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useState } from "react";
import styles from "@/styles/modules/guess-by-hint.module.css";
import Autosuggest from "react-autosuggest";
import { HealthPoint, HealthPointLoss } from "./icons/HealthPoint";

/*
    <p>Nombre: {randomCard.name}</p>
    <p>Costo: {randomCard.cost}</p>
    <p>Poder: {randomCard.power}</p>
    <p>Habilidad: {randomCard.ability}</p>
    <img src={randomCard.art} alt="Random card" />
    <p>URL: {randomCard.url}</p>
*/

function GuessByHints() {
  const { cardsList } = useGlobal();

  const [randomCard, setRandomCard] = useState(null);

  const [streak, setStreak] = useState(0);

  const initialHP = [true, true, true];

  const [hp, setHp] = useState(initialHP);

  const [guessedCardsMap, setGuessedCardsMap] = useState({});

  const [usedReRoll, setUsedReRoll] = useState(false);

  const [userLoses, setUserLoses] = useState(false);

  const [restartLoading, setRestartLoading] = useState(false);

  const [wasGuessed, setWasGuessed] = useState(false);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const generateRandomCard = () => {
    if (cardsList !== null) {
      // Filter out the guessed cards
      const availableCards = cardsList.filter(
        (card) => !guessedCardsMap[card.cid]
      );
      // Get a random card from the available cards
      const newRandomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];
      setRandomCard(newRandomCard);
    }
  };

  useEffect(() => {
    if (cardsList !== null && randomCard === null) {
      setRandomCard(cardsList[Math.floor(Math.random() * cardsList.length)]);
    }
  }, [cardsList]);

  // Function to get suggestions based on user input
  const getSuggestions = (inputValue) => {
    const regex = new RegExp(`^${inputValue}`, "i");
    return cardsList.filter((suggestion) => regex.test(suggestion.name));
  };

  // Autosuggest input props
  const inputProps = {
    placeholder: "Type a name",
    value,
    onChange: (_, { newValue }) => setValue(newValue),
  };

  // Set the suggestions when input changes
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Clear suggestions when input is cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  //Handle when the user enters a suggestion
  const onSuggestionSelected = (_, { suggestion }) => {
    setValue("");

    if (suggestion.cid === randomCard.cid) {
      // Update the guessed cards map
      setGuessedCardsMap((prevMap) => ({
        ...prevMap,
        [suggestion.cid]: true,
      }));

      setStreak((prev) => prev + 1);

      setWasGuessed(true);

      setTimeout(() => {
        setWasGuessed(false);
        generateRandomCard();
      }, 1000);
    }
    if (suggestion.cid !== randomCard.cid) {
      setHp((prev) => {
        const lastIndexTrue = prev.lastIndexOf(true);

        if (lastIndexTrue !== -1) {
          const updatedArr = [...prev];
          updatedArr[lastIndexTrue] = false;
          console.log(updatedArr);
          return updatedArr; // Return the updated array
        }

        return prev; // Return the original array if no update is needed
      });

      setGuessedCardsMap((prevMap) => ({
        ...prevMap,
        [suggestion.cid]: true,
      }));

      generateRandomCard();
    }
  };

  // Render suggestion
  const renderSuggestion = (suggestion) => (
    <div className={styles.suggestion}>{suggestion.name}</div>
  );

  //Allow user one re roll per game if he dont know the card
  const reRoll = () => {
    setGuessedCardsMap((prevMap) => ({
      ...prevMap,
      [randomCard.cid]: true,
    }));

    setUsedReRoll(true);

    generateRandomCard();
  };

  const handleUserLoses = () => {
    setUserLoses(true);
    setUsedReRoll(true);
    setGuessedCardsMap({});
  };

  useEffect(() => {
    if (!hp.includes(true)) {
      handleUserLoses();
    }
  }, [hp]);

  const handleUserRestart = () => {
    setRestartLoading(true);
    setUserLoses(false);
    setUsedReRoll(false);
    setHp(initialHP);
    setGuessedCardsMap({});
    setStreak(0);
    generateRandomCard();
    setRestartLoading(false);
  };

  return (
    <section className={styles.wrapper}>
      {randomCard === null || restartLoading ? (
        <div className={styles.loading}>
          <span>CARGANDO CARTAS ...</span>
        </div>
      ) : (
        <div className={styles.container}>
          {userLoses && (
            <div className={styles.lose_overlay}>
              <div className={styles.lose}>
                <h3>¡GG WP!</h3>
                <p>You guessed {streak} cards</p>
                <div className={styles.lose_ctas}>
                  <button
                    className={styles.restart_cta}
                    onClick={handleUserRestart}
                  >
                    Play again
                  </button>
                  <button className={styles.exit_cta}>Exit</button>
                </div>
              </div>
            </div>
          )}
          <div className={styles.game_container}>
            <h2>START GUESSING</h2>
            <div className={styles.image_container}>
              <div
                className={styles.image_blur}
                style={{
                  backdropFilter: wasGuessed ? "blur(0px)" : "blur(10px)",
                }}
              ></div>
              <img src={randomCard.art} alt="Random card" />
            </div>
            <div className={styles.information}>
              <div className={styles.health}>
                {hp.map((item, index) => (
                  <div key={index} className={styles.health_item}>
                    {item ? <HealthPoint /> : <HealthPointLoss />}
                  </div>
                ))}
              </div>
              <div className={styles.streak}>
                <p>
                  Guessed cards <span>{streak}</span>
                </p>
              </div>
              <button onClick={reRoll} disabled={usedReRoll}>
                Re-roll
              </button>
            </div>
            <div className={styles.autosuggest}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                inputProps={inputProps}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GuessByHints;
