"use client";
import React from "react";

import { useGlobal } from "@/contexts/GlobalContext";
import GuessBySkills from "../components/layouts/GuessBySkills";

function SkillsGameMode() {
  return (
    <main>
      <GuessBySkills />
    </main>
  );
}

export default SkillsGameMode;
