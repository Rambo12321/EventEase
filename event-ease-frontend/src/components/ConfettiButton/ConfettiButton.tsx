"use client";

import React from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

type ConfettiTheme =
  | "Red-Blue"
  | "Gold"
  | "Rainbow"
  | "Green"
  | "Sunset"
  | "Neon"
  | "Ocean"
  | "Galaxy"
  | "Candy"
  | "Fire"
  | "Ice"
  | "CottonCandy"
  | "Cyberpunk";

interface ConfettiButtonProps {
  label?: string;
  theme?: ConfettiTheme;
  classes?: string;
  redirect?: string;
}

const ConfettiButton = ({
  label = "Celebration",
  theme = "Red-Blue",
  classes = "",
  redirect = "",
}: ConfettiButtonProps) => {
  const colorThemes: Record<ConfettiTheme, string[]> = {
    "Red-Blue": ["#ff0000", "#00aaff", "#ffffff", "#ff0077"],
    Gold: ["#ffd700", "#ffb400", "#fff3b0", "#ffdf00"],
    Rainbow: [
      "#ff0000",
      "#ff7b00",
      "#ffee00",
      "#00ff00",
      "#00ccff",
      "#9900ff",
      "#ff00aa",
    ],
    Green: ["#00ff88", "#00cc44", "#99ffcc", "#33ff66"],

    // 🌅 Sunset — warm gradients and tropical energy
    Sunset: ["#ff7e5f", "#feb47b", "#ffcc70", "#ff9a9e", "#fad0c4"],

    // 💡 Neon — futuristic club-style electric tones
    Neon: ["#39ff14", "#ff073a", "#00fff7", "#f5f242", "#ff00e6"],

    // 🌊 Ocean — deep sea blue with bright tropical aqua
    Ocean: ["#007cf0", "#00dfd8", "#00bcd4", "#89f7fe", "#38f9d7"],

    // 🌌 Galaxy — dark purples, electric blues, cosmic vibes
    Galaxy: ["#6a00f4", "#b5179e", "#7209b7", "#4361ee", "#3a0ca3", "#f72585"],

    // 🍭 Candy — fun pastel brights (pink, blue, yellow)
    Candy: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a6c1ee", "#fddb92", "#d1fdff"],

    // 🔥 Fire — intense reds, oranges, yellows
    Fire: ["#ff0000", "#ff7b00", "#ffb700", "#ffd000", "#ff4800"],

    // ❄️ Ice — frosty cyan, mint, and white tones
    Ice: ["#00ffff", "#00e0ff", "#b3f0ff", "#e0ffff", "#a6fff9"],

    // 🍬 Cotton Candy — soft dreamy pink-blue mix
    CottonCandy: ["#ffb6c1", "#a7c5eb", "#c9f4aa", "#b5deff", "#ffcef3"],

    // 🤖 Cyberpunk — electric neon purple, pink, cyan
    Cyberpunk: ["#ff00ff", "#00ffff", "#ff007f", "#7f00ff", "#00ffcc"],
  };

  const router = useRouter();
  const fireConfetti = () => {
    const colors = colorThemes[theme];

    confetti({
      particleCount: 90,
      startVelocity: 50,
      spread: 80,
      origin: { x: 0, y: 0.7 },
      angle: 60,
      colors,
    });

    confetti({
      particleCount: 90,
      startVelocity: 50,
      spread: 80,
      origin: { x: 1, y: 0.7 },
      angle: 120,
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        startVelocity: 60,
        spread: 100,
        origin: { x: 0.5, y: 1 },
        colors,
      });
    }, 200);

    if (redirect !== "") {
      setTimeout(() => {
        router.push(redirect);
      }, 300);
    }
  };

  return (
    <button className={`relative z-10 ${classes}`} onClick={fireConfetti}>
      {label}
    </button>
  );
};
export default ConfettiButton;
