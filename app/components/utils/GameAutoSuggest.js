import { useGlobal } from "@/contexts/GlobalContext";
import React from "react";

import styles from "@/styles/modules/game-auto-suggest.module.css";
import Autosuggest from "react-autosuggest";

function GameAutoSuggest() {
  const {
    suggestions,
    inputProps,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    onSuggestionSelected,
  } = useGlobal();

  // Render suggestion
  const renderSuggestion = (suggestion) => (
    <div className={styles.suggestion}>{suggestion.name}</div>
  );

  return (
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
  );
}

export default GameAutoSuggest;
