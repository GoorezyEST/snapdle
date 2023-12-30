"use client";

import styles from "@/styles/modules/home.module.css";
import { useState, useEffect } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import GameMenu from "./components/layouts/GameMenu";

export default function Home() {
  const { setIsHydrated, songsAndEffects, menuMusic } = useGlobal();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <main>
      <GameMenu />
    </main>
  );
}
