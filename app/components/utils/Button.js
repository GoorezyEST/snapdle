import React from "react";
import { Howl } from "howler";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/contexts/GlobalContext";

function Button({ content, path, cta, doTrigger, trigger }) {
  const { songsAndEffects } = useGlobal();

  let clickEffect = songsAndEffects.clickEffect;

  let hoverEffect = songsAndEffects.hoverEffect;

  const handleClickSound = () => {
    clickEffect.play();

    if (doTrigger) {
      trigger();
    }
  };

  const handleBtnHover = () => {
    hoverEffect.play();
  };

  return (
    <>
      {path ? (
        <a
          href={path}
          onClick={() => handleClickSound()}
          onMouseEnter={handleBtnHover}
        >
          <button className={`${cta}_cta`}>{content}</button>
        </a>
      ) : (
        <span onClick={() => handleClickSound()} onMouseEnter={handleBtnHover}>
          <button className={`${cta}_cta`}>{content}</button>
        </span>
      )}
    </>
  );
}

export default Button;
