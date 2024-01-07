import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";

import ThirdPartyProvider from "@/contexts/ThirdPartyProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  metadataBase: new URL("https://snapdle-game.vercel.app/"),
  title: "Snapdle",
  description:
    "A browser game designed for Marvel Snap enthusiasts! Immerse yourself in the experience as you choose from three game modes: Classic, Pixel, and Skill. Each mode presents a unique challenge where you'll guess cards using different clues. You'll have three lives to prove how much do you know about Marvel Snap. Get ready to showcase your knowledge of the Marvel Snap cards!",
  openGraph: {
    title: "Snapdle",
    description:
      "A browser game designed for Marvel Snap enthusiasts! Immerse yourself in the experience as you choose from three game modes: Classic, Pixel, and Skill. Each mode presents a unique challenge where you'll guess cards using different clues. You'll have three lives to prove how much do you know about Marvel Snap. Get ready to showcase your knowledge of the Marvel Snap cards!",
    url: "https://snapdle-game.vercel.app/",
  },
  keywords: [
    "snapdle",
    "snapdle game",
    "card guessing game",
    "snapdle classic mode",
    "snapdle pixel mode",
    "snapdle skills mode",
    "guess cards",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ThirdPartyProvider>{children}</ThirdPartyProvider>
      </body>
    </html>
  );
}
