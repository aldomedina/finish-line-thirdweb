import { IBM_Plex_Mono } from "@next/font/google";
import localFont from "@next/font/local";

export const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
  style: ["italic", "normal"],
});

export const apfel = localFont({
  src: [
    { path: "../assets/fonts/ApfelGrotezk-Regular.woff", weight: "400" },
    { path: "../assets/fonts/ApfelGrotezk-Fett.woff", weight: "700" },
  ],
});
