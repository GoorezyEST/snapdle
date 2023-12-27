"use client";

import React from "react";
import { useGlobal } from "./GlobalContext";

function LoadingScreen({ children }) {
  return <>{children}</>;
}

export default LoadingScreen;
