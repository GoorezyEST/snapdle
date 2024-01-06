"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { retrieveCards } from "@/functions/getAllCards";
import { Howl, Howler } from "howler";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  //State to manage if the current page is loaded
  const [isHydrated, setIsHydrated] = useState(false);
  //State to store all the cards globaly
  const [cardsList, setCardList] = useState(null);
  //State to store a random card and extract from it the data for each game mode
  const [randomCard, setRandomCard] = useState(null);
  //State to store a map of the cards that already appeared in the current game
  const [guessedCardsMap, setGuessedCardsMap] = useState({});
  //Health points state and variable
  const initialHP = [true, true, true];
  const [hp, setHp] = useState(initialHP);
  //Streak state
  const [streak, setStreak] = useState(0);
  //State to manage if the re roll button has been used
  const [usedReRoll, setUsedReRoll] = useState(false);
  //State to check if the card was guessed by the user or not
  const [wasGuessed, setWasGuessed] = useState(false);
  //State to trigger a modal window when the user loses the game
  const [userLoses, setUserLoses] = useState(false);

  //States and fns to handle the suggestions for the AutoSuggest component
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
    disabled: userLoses,
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
      if (!areEffectsMuted) {
        songsAndEffects.correctAnswerEffect.play();
      }

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
      if (!areEffectsMuted) {
        songsAndEffects.gameLose.play();
      }

      if (hp.lastIndexOf(true) !== 0) {
        setGuessedCardsMap((prevMap) => ({
          ...prevMap,
          [suggestion.cid]: true,
        }));

        generateRandomCard();
      }

      setHp((prev) => {
        const lastIndexTrue = prev.lastIndexOf(true);

        if (lastIndexTrue !== -1) {
          const updatedArr = [...prev];
          updatedArr[lastIndexTrue] = false;
          return updatedArr; // Return the updated array
        }

        return prev; // Return the original array if no update is needed
      });
    }
  };

  //Function to generate a random card
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

  //useEffect to retrieve all the cards in the first render of the website
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await retrieveCards();

        // Filter cards based on status and exclude cards with "evolved" in their names
        const filteredCards = result.success.cards.filter(
          (card) =>
            card.status === "released" &&
            !card.name.toLowerCase().includes("evolved")
        );

        setCardList(filteredCards);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, []);

  //Trigger the lose state when there's no health points
  useEffect(() => {
    if (!hp.includes(true)) {
      setUserLoses(true);
    }
  }, [hp]);

  //Function to handle when the user want to restart the game
  const handleUserRestart = () => {
    setUserLoses(false);
    setUsedReRoll(false);
    setHp(initialHP);
    setGuessedCardsMap({});
    setStreak(0);
    generateRandomCard();
  };

  //Object to store all the audio effects used through the game
  const songsAndEffects = {
    correctAnswerEffect: new Howl({
      src: ["/audio/correct-answer.ogg"],
      volume: 0.02,
    }),
    gameLose: new Howl({
      src: ["/audio/game-lose.ogg"],
      volume: 0.02,
    }),
    reRollEffect: new Howl({
      src: ["/audio/re-roll.ogg"],
      volume: 0.02,
    }),
  };

  const [areEffectsMuted, setAreEffectsMuted] = useState(false);

  const [isMusicMuted, setIsMusicMuted] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isHydrated,
        setIsHydrated,
        cardsList,
        randomCard,
        setRandomCard,
        guessedCardsMap,
        setGuessedCardsMap,
        initialHP,
        hp,
        setHp,
        streak,
        setStreak,
        usedReRoll,
        setUsedReRoll,
        value,
        setValue,
        suggestions,
        setSuggestions,
        getSuggestions,
        inputProps,
        onSuggestionsFetchRequested,
        onSuggestionsClearRequested,
        onSuggestionSelected,
        generateRandomCard,
        wasGuessed,
        setWasGuessed,
        userLoses,
        setUserLoses,
        handleUserRestart,
        songsAndEffects,
        setGuessedCardsMap,
        areEffectsMuted,
        setAreEffectsMuted,
        isMusicMuted,
        setIsMusicMuted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe ser usado con un settings provider");
  }
  return context;
}
