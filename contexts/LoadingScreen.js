"use client";

import React from "react";
import { useGlobal } from "./GlobalContext";
import MainLogo from "@/app/components/brand-assets/MainLogo";

function LoadingScreen({ children }) {
  const { isHydrated } = useGlobal();

  return (
    <>
      {!isHydrated && (
        <div className="loading_wrapper">
          <div className="loading">
            <div className="loading_logo">
              <MainLogo />
            </div>
            <span className="loading_loader"></span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default LoadingScreen;
