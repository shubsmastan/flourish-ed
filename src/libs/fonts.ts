import { Crimson_Text } from "next/font/google";
import { Lato } from "next/font/google";

export const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
});
