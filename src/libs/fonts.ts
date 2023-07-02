import { Ysabeau } from "next/font/google";
import { Figtree } from "next/font/google";

export const ysabeau = Ysabeau({
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
});

export const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
});
