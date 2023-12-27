"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { retrieveCards } from "@/functions/getAllCards";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [cardsList, setCardList] = useState(null);

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

  return (
    <GlobalContext.Provider
      value={{
        cardsList,
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
