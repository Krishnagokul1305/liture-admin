import localFont from "next/font/local";

export const myFont = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../public/fonts/font-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/font-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/font-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/font-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
