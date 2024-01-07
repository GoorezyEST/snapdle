"use client";

import { useEffect } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import GameMenu from "./components/layouts/GameMenu";

export default function Home() {
  const { setIsHydrated } = useGlobal();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <main>
      <GameMenu />
    </main>
  );
}
