"use client";

import styles from "@/styles/modules/home.module.css";
import { useState, useEffect } from "react";
import { useGlobal } from "@/contexts/GlobalContext";

export default function Home() {
  const { setIsHydrated } = useGlobal();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <main>
      Home page:
      <a href="/classic-mode">Classic mode</a>
    </main>
  );
}
