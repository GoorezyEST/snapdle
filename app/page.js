"use client";

import styles from "@/styles/modules/home.module.css";
import { useState, useEffect } from "react";
import GuessByHints from "./components/GuessByHints";

export default function Home() {
  return (
    <main>
      <GuessByHints />
    </main>
  );
}
