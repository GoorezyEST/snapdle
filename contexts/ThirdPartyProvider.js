import React from "react";
import { GlobalProvider } from "./GlobalContext";
import LoadingScreen from "./LoadingScreen";

function ThirdPartyProvider({ children }) {
  return (
    <GlobalProvider>
      <LoadingScreen>{children}</LoadingScreen>
    </GlobalProvider>
  );
}

export default ThirdPartyProvider;
